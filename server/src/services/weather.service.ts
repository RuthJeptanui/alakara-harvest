import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface IWeatherData {
  temp: number;
  humidity: number;
  description: string;
  location: string;
  icon: string;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

// Default to a major farming region (e.g., Makueni or Nairobi)
// In the future, we can pass lat/lon from the user's profile
const DEFAULT_LAT = -1.2921; // Nairobi
const DEFAULT_LON = 36.8219;

export const getLiveWeather = async (): Promise<IWeatherData | null> => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `${BASE_URL}?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&appid=${apiKey}&units=metric`;
    const response = await axios.get<OpenWeatherResponse>(url);
    
    const data = response.data;

    return {
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      location: data.name,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    return null;
  }
};