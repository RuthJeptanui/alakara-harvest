import express from 'express';
import type { Request, Response } from 'express';
import { MarketData } from '../models/marketData.models.ts';
import { CropData } from '../models/cropData.models.ts';
import { PlatformStats } from '../models/platformStats.models.ts';
import { Alert } from '../models/alert.models.ts';
import { Trend } from '../models/trend.models.ts';

// Import our mock data for seeding
import {
  mockMarketData,
  mockCropData,
  mockPlatformStats,
  mockAlerts,
  mockTrends
} from '../lib/mockData';

// --- Helper function to seed the database ---
const seedDatabase = async () => {
  try {
    // We only seed if the collections are empty
    if (await PlatformStats.countDocuments() === 0) {
      await PlatformStats.create(mockPlatformStats);
      console.log('DB Seeded: PlatformStats');
    }
    if (await MarketData.countDocuments() === 0) {
      await MarketData.insertMany(mockMarketData);
      console.log('DB Seeded: MarketData');
    }
    if (await CropData.countDocuments() === 0) {
      await CropData.insertMany(mockCropData.map(c => ({ ...c, cropId: c.id })));
      console.log('DB Seeded: CropData');
    }
    if (await Alert.countDocuments() === 0) {
      await Alert.insertMany(mockAlerts);
      console.log('DB Seeded: Alerts');
    }
    if (await Trend.countDocuments() === 0) {
      await Trend.insertMany(mockTrends);
      console.log('DB Seeded: Trends');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// --- Main Controller Function ---
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // 1. Seed the database (this will only run if collections are empty)
    await seedDatabase();

    // 2. Fetch all data in parallel for performance
    const [stats, marketData, cropData, alerts, trends] = await Promise.all([
      PlatformStats.findOne(),
      MarketData.find().sort({ createdAt: -1 }).limit(3), // Get 3 most recent
      CropData.find(),
      Alert.find().sort({ createdAt: -1 }).limit(3), // Get 3 most recent
      Trend.find().sort({ createdAt: -1 }).limit(3)  // Get 3 most recent
    ]);

    // 3. Send the combined data object
    res.status(200).json({
      stats,
      marketData,
      cropData,
      alerts,
      trends
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};