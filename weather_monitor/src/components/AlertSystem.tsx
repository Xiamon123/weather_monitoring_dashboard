import React, { useState } from 'react';
import { AlertConfig } from '../types/WeatherTypes';
import { AlertTriangle, ThermometerSun, ThermometerSnowflake } from 'lucide-react';

interface AlertSystemProps {
  alerts: string[];
  config: AlertConfig;
  setConfig: React.Dispatch<React.SetStateAction<AlertConfig>>;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts, config, setConfig }) => {
  const [tempInput, setTempInput] = useState({ high: config.highTemp, low: config.lowTemp });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempInput(prev => ({ ...prev, [name]: Number(value) }));
  };

  const applyThresholds = () => {
    setConfig(prev => ({
      ...prev,
      highTemp: tempInput.high,
      lowTemp: tempInput.low
    }));
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">Alert System</h2>
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Configure Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col">
            <span className="mb-1 flex items-center">
              <ThermometerSun className="w-5 h-5 mr-2 text-red-500" />
              High Temp Threshold (°C)
            </span>
            <input
              type="number"
              name="high"
              value={tempInput.high}
              onChange={handleConfigChange}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 flex items-center">
              <ThermometerSnowflake className="w-5 h-5 mr-2 text-blue-500" />
              Low Temp Threshold (°C)
            </span>
            <input
              type="number"
              name="low"
              value={tempInput.low}
              onChange={handleConfigChange}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          onClick={applyThresholds}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Apply Thresholds
        </button>
      </div>
      <div>
        <h3 className="text-xl font-medium mb-3">Recent Alerts</h3>
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.slice(-5).map((alert, index) => (
              <div key={index} className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded animate-pulse-fast">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                <span className="font-medium">{alert}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent alerts</p>
        )}
      </div>
    </div>
  );
};

export default AlertSystem;