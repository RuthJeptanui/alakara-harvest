import { Schema, model } from 'mongoose';
import type { ITransport } from '../interfaces/dtos/transport-dtos.ts';

const transportSchema = new Schema<ITransport>({
  userId: { type: String, required: true, index: true },
  ownerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: String, required: true },
  rate: { type: String, required: true },
  availability: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export const Transport = model<ITransport>('Transport', transportSchema);