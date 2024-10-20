import { WeatherData, DailySummary, AlertConfig } from '../types/WeatherTypes';
import { format } from 'date-fns';

export const processDailySummary = (data: WeatherData[]): DailySummary => {
  const temps = data.map(d => d.temp);
  const conditions = data.map(d => d.main);

  return {
    date: format(new Date(data[0].dt * 1000), 'yyyy-MM-dd'),
    avgTemp: Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)),
    maxTemp: Math.max(...temps),
    minTemp: Math.min(...temps),
    dominantCondition: getDominantCondition(conditions)
  };
};

const getDominantCondition = (conditions: string[]): string => {
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

export const checkAlertThresholds = (data: WeatherData, config: AlertConfig, prevAlerts: number): boolean => {
  const { temp } = data;
  const { highTemp, lowTemp, consecutiveUpdates } = config;

  if (temp > highTemp || temp < lowTemp) {
    return prevAlerts + 1 >= consecutiveUpdates;
  }

  return false;
};