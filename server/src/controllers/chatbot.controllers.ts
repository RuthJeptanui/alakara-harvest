import { Request, Response } from 'express';
import { ChatSession } from '../models/chatbot.models';
import { generateBotResponse } from '../services/chatbot.service';
import { IMessage } from '../interfaces/dtos/chatbot-dtos';

// For this example, we'll find-or-create one single chat session
// Later, this would be based on req.user.id from auth
const getOrCreateSession = async () => {
  let session = await ChatSession.findOne();
  if (!session) {
    session = new ChatSession({ messages: [
      {
        id: '1',
        text: "Habari! I'm Alakara's AI assistant. I can help with post-harvest for mangoes, tomatoes, and oranges. What's on your mind?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]});
    await session.save();
  }
  return session;
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const session = await getOrCreateSession();
    res.status(200).json(session.messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history', error });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const session = await getOrCreateSession();

    // 1. Create and add user message
    const userMessage: IMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    session.messages.push(userMessage);

    // 2. Generate and add bot response
    const botResponseText = generateBotResponse(text);
    const botMessage: IMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };
    session.messages.push(botMessage);

    // 3. Save the session
    await session.save();

    // 4. Send *only the new bot message* back to the client
    // The client will use this to update its state.
    res.status(201).json(botMessage);

  } catch (error) {
    res.status(500).json({ message: 'Error posting message', error });
  }
};