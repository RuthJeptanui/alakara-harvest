import { Schema, model } from 'mongoose';
import { ITrend } from '../interfaces/dtos/dashboard-dtos';

const trendSchema = new Schema<ITrend>({
  crop: { type: String, required: true },
  trend: { type: String, required: true },
  level: { type: String, enum: ['positive', 'neutral', 'negative'], required: true },
}, { timestamps: true });

export const Trend = model<ITrend>('Trend', trendSchema);