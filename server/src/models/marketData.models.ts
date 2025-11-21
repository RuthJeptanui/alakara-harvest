import { Schema, model } from 'mongoose';
import type { IMarketData } from '../interfaces/dtos/dashboard-dtos.ts';

const marketDataSchema = new Schema<IMarketData>({
  crop: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  priceChange: { type: Number, required: true },
  demand: { type: String, enum: ['high', 'medium', 'low'], required: true },
  bestSellingTime: { type: String, required: true },
}, { timestamps: true });

export const MarketData = model<IMarketData>('MarketData', marketDataSchema);