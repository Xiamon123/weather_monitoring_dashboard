import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { DailySummary } from '../types/WeatherTypes';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface WeatherChartProps {
  data: DailySummary[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const temperatureData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: data.map(d => d.avgTemp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Max Temperature',
        data: data.map(d => d.maxTemp),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Min Temperature',
        data: data.map(d => d.minTemp),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const temperatureOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Trends',
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'snow':
        return <Snowflake className="w-6 h-6 text-blue-300" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div>
      <Line data={temperatureData} options={temperatureOptions} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Dominant Weather Conditions</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((day, index) => (
            <div key={index} className="flex items-center bg-white rounded-full px-3 py-1 shadow">
              <span className="text-sm font-medium mr-2">{day.date}</span>
              {getWeatherIcon(day.dominantCondition)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;