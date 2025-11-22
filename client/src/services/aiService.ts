// Define the API base URL
const API_URL = 'http://localhost:5000/api';

export interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Fetches the chat history from the backend.
 * @param token The Clerk authentication token
 */
export const getChatHistory = async (token: string): Promise<IMessage[]> => {
  try {
    // We do NOT call useAuth() here. We use the token passed in.
    const response = await fetch(`${API_URL}/chat/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch history`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Service - getChatHistory Error:", error);
    throw error;
  }
};

/**
 * Sends a user message to the backend and returns the bot's response.
 * @param text The message text to send
 * @param token The Clerk authentication token
 */
export const sendChatMessage = async (text: string, token: string): Promise<IMessage> => {
  try {
    const response = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to send message`);
    }

    const botResponse = await response.json();
    return botResponse;
  } catch (error) {
    console.error("AI Service - sendChatMessage Error:", error);
    throw error;
  }
};