import express from 'express';
import type { Request, Response } from 'express';
import { MarketData } from '../models/marketData.models.ts';
import { CropData } from '../models/cropData.models.ts';
import { PlatformStats } from '../models/platformStats.models.ts';
import { Alert } from '../models/alert.models.ts';
import { Trend } from '../models/trend.models.ts';

import {
  mockMarketData,
  mockCropData,
  mockPlatformStats,
  mockAlerts,
  mockTrends
} from '../lib/mockData.ts';
import { getFaoTrends } from '../services/fao.service.ts';
import { getLiveWeather } from '../services/weather.service.ts';

const seedDatabase = async () => {
  try {
    if (await PlatformStats.countDocuments() === 0) {
      await PlatformStats.create(mockPlatformStats);
    }
    if (await MarketData.countDocuments() === 0) {
      await MarketData.insertMany(mockMarketData);
    }
    if (await CropData.countDocuments() === 0) {
      await CropData.insertMany(mockCropData.map(c => ({ ...c, cropId: c.id })));
    }
    if (await Alert.countDocuments() === 0) {
      await Alert.insertMany(mockAlerts);
    }
    if (await Trend.countDocuments() === 0) {
      await Trend.insertMany(mockTrends);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    await seedDatabase();

    // Fetch DB data
    const [stats, marketData, cropData, alerts, trends] = await Promise.all([
      PlatformStats.findOne(),
      MarketData.find().sort({ createdAt: -1 }).limit(3),
      CropData.find(),
      Alert.find().sort({ createdAt: -1 }).limit(3),
      Trend.find().sort({ createdAt: -1 }).limit(3)
    ]);

    // Fetch External API data (Live)
    const weather = await getLiveWeather();
    const faoData = await getFaoTrends(); 

    // If we got valid FAO data, we might ideally update our 'trends' collection here
    // For now, we'll just log it to show it's working
    if (faoData.length > 0) {
        console.log("Fetched FAO Data:", faoData.length, "records");
    }

    // Send everything to frontend
    res.status(200).json({
      stats,
      marketData,
      cropData,
      alerts,
      trends,
      weather, // <-- Added weather to response
      externalMarketTrends: faoData // <-- Added FAO trends
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};