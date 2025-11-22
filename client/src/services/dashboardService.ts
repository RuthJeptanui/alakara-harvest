// Define the API URL - In a real app, use import.meta.env.VITE_API_URL
const API_URL = 'http://localhost:5000/api'

// --- Interfaces ---
// We export these so the component can use them without redefining them
export interface IMarketData {
  crop: string;
  currentPrice: number;
  priceChange: number;
  demand: 'high' | 'medium' | 'low';
  bestSellingTime: string;
}

export interface ICropData {
  cropId: string;
  name: string;
  averageLoss: number;
  currentReduction: number;
}

export interface IPlatformStats {
  totalLossReduction: number;
  farmersHelped: number;
  avgIncomeIncrease: number;
}

export interface IAlert {
  type: 'alert' | 'opportunity' | 'info';
  title: string;
  message: string;
  level: 'high' | 'medium' | 'low';
}

export interface ITrend {
  crop: string;
  trend: string;
  level: 'positive' | 'neutral' | 'negative';
}

export interface IDashboardData {
  stats: IPlatformStats;
  marketData: IMarketData[];
  cropData: ICropData[];
  alerts: IAlert[];
  trends: ITrend[];
}

// --- Service Functions ---

/**
 * Fetches the dashboard data from the backend.
 * @param token - The Clerk authentication token
 */
export const getDashboardData = async (token: string): Promise<IDashboardData> => {
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Try to parse error message from server
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error ${response.status}: Failed to fetch dashboard data`);
    }

    const data: IDashboardData = await response.json();
    return data;
  } catch (error) {
    console.error('Dashboard Service Error:', error);
    console.error('API URL:', API_URL);
    //message error to the console
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};