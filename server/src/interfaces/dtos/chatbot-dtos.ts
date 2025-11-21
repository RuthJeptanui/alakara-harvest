// We can re-use the interface you defined
export interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// We'll create a Chat Session to hold a conversation
export interface IChatSession {
  // We can link this to a user ID later
  // userId: string; 
  messages: IMessage[];
}