import { Schema, model, Document } from 'mongoose';
import type  { IMessage, IChatSession } from '../interfaces/dtos/chatbot-dtos.ts';

// Schema for the individual messages
const messageSchema = new Schema<IMessage>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: String, enum: ['user', 'bot'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false }); // _id: false for subdocuments



// Schema for the overall chat session
const chatSessionSchema = new Schema<IChatSession & Document>({
  // We'll add a userId here when we implement authentication
  // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema]
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

export const ChatSession = model<IChatSession & Document>('ChatSession', chatSessionSchema);