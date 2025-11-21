// This is the mock data we'll use to seed the database

export const mockMarketData = [
  { 
    crop: 'Mangoes (Apple)', 
    currentPrice: 120, 
    priceChange: 5.5, 
    demand: 'high', 
    bestSellingTime: '6 AM - 9 AM' 
  },
  { 
    crop: 'Tomatoes', 
    currentPrice: 80, 
    priceChange: -2.1, 
    demand: 'medium', 
    bestSellingTime: '7 AM - 10 AM' 
  },
  { 
    crop: 'Oranges (Local)', 
    currentPrice: 95, 
    priceChange: 3.0, 
    demand: 'high', 
    bestSellingTime: '8 AM - 11 AM' 
  },
];

export const mockCropData = [
  { 
    id: 'mango', 
    name: 'Mangoes', 
    averageLoss: 50, // Base average loss
    currentReduction: 38 // Achieved reduction
  },
  { 
    id: 'tomato', 
    name: 'Tomatoes', 
    averageLoss: 60,
    currentReduction: 42
  },
  { 
    id: 'orange', 
    name: 'Oranges', 
    averageLoss: 45,
    currentReduction: 28
  },
];

export const mockPlatformStats = {
  totalLossReduction: 35,
  farmersHelped: 2500,
  avgIncomeIncrease: 28,
};

export const mockAlerts = [
  {
    type: 'alert',
    title: 'High Temperature Alert',
    message: 'Temperatures expected to reach 35°C+ this week. Increase shade and ventilation for stored produce.',
    level: 'high'
  },
  {
    type: 'opportunity',
    title: 'Market Opportunity',
    message: 'New aggregation center opened in Nakuru. 15% better prices for quality mangoes and oranges.',
    level: 'high'
  },
  {
    type: 'info',
    title: 'Transport Update',
    message: 'Refrigerated trucks available for Mombasa route. Book early for 20% discount on transport costs.',
    level: 'medium'
  }
];

export const mockTrends = [
   { 
    crop: 'Mangoes', 
    trend: 'Prices expected to rise 8-12% due to reduced supply. Good time to sell premium varieties.',
    level: 'positive'
  },
   { 
    crop: 'Tomatoes', 
    trend: 'Stable demand. Focus on quality grading to maximize returns.',
    level: 'neutral'
  },
   { 
    crop: 'Oranges', 
    trend: 'High demand from juice processors. Consider bulk sales for better prices.',
    level: 'positive'
  },
];