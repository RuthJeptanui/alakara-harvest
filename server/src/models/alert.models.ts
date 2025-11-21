import { Schema, model } from 'mongoose';
import { IAlert } from '../interfaces/dtos/dashboard-dtos';

const alertSchema = new Schema<IAlert>({
  type: { type: String, enum: ['alert', 'opportunity', 'info'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  level: { type: String, enum: ['high', 'medium', 'low'], required: true },
}, { timestamps: true });

export const Alert = model<IAlert>('Alert', alertSchema);