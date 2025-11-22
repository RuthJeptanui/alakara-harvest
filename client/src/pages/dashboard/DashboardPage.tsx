import  { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { TrendingUp, TrendingDown, Clock, DollarSign, BarChart3, AlertCircle, Loader2 } from 'lucide-react';



// Import service and interfaces
import { getDashboardData } from '../../services/dashboardService.ts';
import type { IDashboardData } from '../../services/dashboardService.ts';

// --- Dashboard Component ---
export default function Dashboard() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [data, setData] = useState<IDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Wait for Clerk to load
      if (!isLoaded || !isSignedIn) return;

      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
            throw new Error("Authentication token not found");
        }
        
        // Use the service to get data
        const result = await getDashboardData(token);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getToken, isLoaded, isSignedIn]);

  // --- Helper Functions for UI Logic ---
  const getPriceChangeIcon = (change: number) => {
    return change > 0 ? TrendingUp : TrendingDown;
  };

  const getPriceChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendBorderColor = (level: string) => {
    switch (level) {
      case 'positive': return 'border-l-green-500';
      case 'neutral': return 'border-l-yellow-500';
      case 'negative': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  const getAlertIconStyle = (level: string) => {
     switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <span className="ml-4 text-xl text-gray-700">Loading Market Data...</span>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] max-w-lg mx-auto text-center">
        <Card className="border-red-200 bg-red-50 p-8">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  // --- Data Loaded State ---
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Intelligence Dashboard</h1>
          <p className="text-xl text-gray-600">
            Real-time market data and insights to optimize your selling decisions
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Loss Reduction</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{data?.stats.totalLossReduction}%</div>
              <p className="text-xs text-muted-foreground">
                Among farmers using our platform
              </p>
              <Progress value={data?.stats.totalLossReduction} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farmers Helped</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{data?.stats.farmersHelped.toLocaleString()}+</div>
              <p className="text-xs text-muted-foreground">
                Across Kenya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income Increase</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{data?.stats.avgIncomeIncrease}%</div>
              <p className="text-xs text-muted-foreground">
                Average improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Market Prices */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Market Prices
            </CardTitle>
            <CardDescription>
              Live market data updated every hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.marketData.map((item, index) => {
                const PriceIcon = getPriceChangeIcon(item.priceChange);
                return (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.crop}</CardTitle>
                        <Badge className={getDemandColor(item.demand)} variant="secondary">
                          {item.demand} demand
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">KSh {item.currentPrice}/kg</span>
                          <div className={`flex items-center gap-1 ${getPriceChangeColor(item.priceChange)}`}>
                            <PriceIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {item.priceChange > 0 ? '+' : ''}{item.priceChange}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Best time: {item.bestSellingTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Crop Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Loss Reduction by Crop</CardTitle>
              <CardDescription>
                Average loss reduction achieved by farmers using our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.cropData.map((crop) => (
                  <div key={crop.cropId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{crop.name}</span>
                      <span className="text-sm text-green-600 font-medium">{crop.currentReduction}% reduction</span>
                    </div>
                    <Progress value={crop.currentReduction} className="h-2" />
                    <div className="text-xs text-gray-500">
                      From {crop.averageLoss}% to {crop.averageLoss - crop.currentReduction}% average loss
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Market Trends</CardTitle>
              <CardDescription>
                Price trends and recommendations for the coming week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.trends.map((trend, index) => (
                  <div key={index} className={`border-l-4 ${getTrendBorderColor(trend.level)} pl-4`}>
                    <h4 className="font-semibold">{trend.crop}</h4>
                    <p className="text-sm text-gray-600">
                      {trend.trend}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Recommendations */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              Market Alerts & Recommendations
            </CardTitle>
            <CardDescription className="text-orange-700">
              Important updates for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.alerts.map((alert, index) => (
                 <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200">
                  <div className={`w-2 h-2 ${getAlertIconStyle(alert.level)} rounded-full mt-2 flex-shrink-0`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600">
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}