import { Schema, model } from 'mongoose';
import { IPlatformStats } from '../interfaces/dtos/dashboard-dtos';

// This schema is designed to hold only one document
const platformStatsSchema = new Schema<IPlatformStats>({
  totalLossReduction: { type: Number, required: true },
  farmersHelped: { type: Number, required: true },
  avgIncomeIncrease: { type: Number, required: true },
}, { timestamps: true });

export const PlatformStats = model<IPlatformStats>('PlatformStats', platformStatsSchema);