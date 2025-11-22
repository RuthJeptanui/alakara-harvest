import { Schema, model } from 'mongoose';
import type { ITrend } from '../interfaces/dtos/dashboard-dtos.ts';

const trendSchema = new Schema<ITrend>({
  crop: { type: String, required: true },
  trend: { type: String, required: true },
  level: { type: String, enum: ['positive', 'neutral', 'negative'], required: true },
}, { timestamps: true });

export const Trend = model<ITrend>('Trend', trendSchema);