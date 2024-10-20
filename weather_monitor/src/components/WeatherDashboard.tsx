import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/api';
import { processDailySummary } from '../utils/weatherProcessing';
import { WeatherData, DailySummary, AlertConfig } from '../types/WeatherTypes';
import WeatherChart from './WeatherChart';
import AlertSystem from './AlertSystem';
import { Sun, CloudRain, Cloud, Wind, Droplets } from 'lucide-react';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    highTemp: 35,
    lowTemp: 10,
    consecutiveUpdates: 1
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();
        setWeatherData(prevData => [...prevData, ...data]);
        
        // Process daily summary
        const summary = processDailySummary(data);
        setDailySummaries(prev => {
          const exists = prev.find(s => s.date === summary.date);
          if (exists) {
            return prev.map(s => s.date === summary.date ? summary : s);
          }
          return [...prev, summary].slice(-7); // Keep only the last 7 days
        });

        // Check for alerts
        data.forEach(cityData => {
          if (cityData.temp > alertConfig.highTemp) {
            setAlerts(prev => [...prev, `High temperature alert for ${cityData.city}: ${cityData.temp.toFixed(1)}°C`]);
          } else if (cityData.temp < alertConfig.lowTemp) {
            setAlerts(prev => [...prev, `Low temperature alert for ${cityData.city}: ${cityData.temp.toFixed(1)}°C`]);
          }
        });

        setError(null);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError((err as Error).message || 'An unexpected error occurred');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, [alertConfig]);

  const getBackgroundImage = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';
      case 'clouds':
        return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2002&q=80';
      case 'rain':
        return 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
      default:
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8" style={{
      backgroundImage: `url(${getBackgroundImage(weatherData[weatherData.length - 1]?.main || 'clear')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white text-center shadow-text">Weather Monitoring Dashboard</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
            <div className="grid grid-cols-2 gap-4">
              {weatherData.slice(-6).map((data, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">{data.city}</h3>
                  <div className="flex items-center mb-2">
                    {data.main === 'Clear' && <Sun className="w-6 h-6 mr-2 text-yellow-500" />}
                    {data.main === 'Clouds' && <Cloud className="w-6 h-6 mr-2 text-gray-500" />}
                    {data.main === 'Rain' && <CloudRain className="w-6 h-6 mr-2 text-blue-500" />}
                    <span>{data.main}</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">{data.temp.toFixed(1)}°C</p>
                  <p className="flex items-center"><Wind className="w-4 h-4 mr-1" /> {data.wind_speed} m/s</p>
                  <p className="flex items-center"><Droplets className="w-4 h-4 mr-1" /> {data.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <WeatherChart data={dailySummaries} />
          </div>
        </div>
        <div className="mt-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-md">
          <AlertSystem alerts={alerts} config={alertConfig} setConfig={setAlertConfig} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;