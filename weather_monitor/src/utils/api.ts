import axios from 'axios';
import { WeatherData } from '../types/WeatherTypes';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || '9d2f726452e3bd18db4bcb592a4b0731';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

export const fetchWeatherData = async (): Promise<WeatherData[]> => {
  try {
    const promises = cities.map(city =>
      axios.get(`${BASE_URL}?q=${city},IN&appid=${API_KEY}&units=metric`)
    );

    const responses = await Promise.all(promises);

    return responses.map(response => ({
      city: response.data.name,
      main: response.data.weather[0].main,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      dt: response.data.dt
    }));
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw new Error('Failed to fetch weather data. Please check your API key and try again.');
  }
};