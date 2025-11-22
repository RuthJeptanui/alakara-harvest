import express from 'express';
import type { Request, Response } from 'express';
import { ChatSession } from '../models/chatbot.models.ts';
import { generateBotResponse } from '../services/chatbot.service.ts';
import type { IMessage } from '../interfaces/dtos/chatbot-dtos.ts';
import { generateAIResponse } from '../services/ai.service.ts';

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

    // 1. User Message
    const userMessage: IMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    session.messages.push(userMessage);

    // 2. AI Generation (Using Hugging Face now)
    const botResponseText = await generateAIResponse(text); // <-- Await the AI
    
    const botMessage: IMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };
    session.messages.push(botMessage);

    await session.save();
    res.status(201).json(botMessage);

  } catch (error) {
    res.status(500).json({ message: 'Error posting message', error });
  }
};