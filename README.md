Real-Time Weather Monitoring System
This project implements a real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system utilizes data from the OpenWeatherMap API.

Features
Continuous retrieval of weather data for major Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad)
Daily weather summaries with average, maximum, and minimum temperatures
Dominant weather condition calculation
Configurable alerting thresholds for temperature extremes
Visualizations for daily weather summaries and historical trends
Prerequisites
Node.js (v14 or later)
npm (v6 or later)
OpenWeatherMap API key
Setup
Clone the repository:

git clone https://github.com/yourusername/weather-monitoring-system.git
cd weather-monitoring-system
Install dependencies:

npm install
Create a .env file in the root directory and add your OpenWeatherMap API key:

VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
Start the development server:

npm run dev
Open your browser and navigate to http://localhost:5173 to view the application.

Build for Production
To build the application for production, run:

npm run build
The built files will be in the dist directory.

Design Choices
React with TypeScript: Provides a robust and type-safe foundation for building the user interface.
Vite: Used as the build tool for fast development and optimized production builds.
Tailwind CSS: Utilized for rapid UI development with utility-first CSS.
Chart.js and react-chartjs-2: Chosen for creating interactive and responsive charts.
Axios: Used for making HTTP requests to the OpenWeatherMap API.
date-fns: Employed for efficient date manipulation and formatting.
Project Structure
src/components: React components for the UI
src/types: TypeScript type definitions
src/utils: Utility functions for API calls and data processing
src/App.tsx: Main application component
src/main.tsx: Entry point of the application
Testing
To run the test suite:

npm test
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
