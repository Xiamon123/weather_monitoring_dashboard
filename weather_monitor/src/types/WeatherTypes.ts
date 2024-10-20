export interface WeatherData {
  city: string;
  main: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  dt: number;
}

export interface DailySummary {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
}

export interface AlertConfig {
  highTemp: number;
  lowTemp: number;
  consecutiveUpdates: number;
}