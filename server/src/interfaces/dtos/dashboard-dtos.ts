import { Document } from 'mongoose';

// --- For Market Prices ---
export interface IMarketData extends Document {
  crop: string;
  currentPrice: number;
  priceChange: number; // Percentage
  demand: 'high' | 'medium' | 'low';
  bestSellingTime: string;
}

// --- For Crop Performance ---
export interface ICropData extends Document {
  cropId: string;
  name: string;
  averageLoss: number; // e.g., 50%
  currentReduction: number; // e.g., 38%
}

// --- For Key Metrics ---
export interface IPlatformStats extends Document {
  totalLossReduction: number;
  farmersHelped: number;
  avgIncomeIncrease: number;
}

// --- For Trends & Alerts (We'll store these in the DB too) ---
export interface IAlert extends Document {
  type: 'alert' | 'opportunity' | 'info';
  title: string;
  message: string;
  level: 'high' | 'medium' | 'low';
}

export interface ITrend extends Document {
  crop: string;
  trend: string;
  level: 'positive' | 'neutral' | 'negative';
}