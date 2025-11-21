import { Schema, model } from 'mongoose';
import { ICropData } from '../interfaces/dtos/dashboard-dtos';

const cropDataSchema = new Schema<ICropData>({
  cropId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  averageLoss: { type: Number, required: true },
  currentReduction: { type: Number, required: true },
}, { timestamps: true });

export const CropData = model<ICropData>('CropData', cropDataSchema);