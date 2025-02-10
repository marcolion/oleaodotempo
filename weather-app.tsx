import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TERESINA = { name: "Teresina", state: "PI", lat: -5.0892, lon: -42.8016 };

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito para buscar dados do clima
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const mockData = {
          current: {
            temp: Math.round(25 + Math.random() * 10),
            humidity: Math.round(60 + Math.random() * 30),
            weather: [{ id: 800, main: 'Clear', description: 'céu limpo' }]
          },
          daily: Array(7).fill(null).map((_, index) => ({
            dt: Date.now() + index * 24 * 60 * 60 * 1000,
            temp: {
              min: Math.round(20 + Math.random() * 8),
              max: Math.round(28 + Math.random() * 8)
            },
            humidity: Math.round(60 + Math.random() * 30),
            pop: Math.random(),
            weather: [{
              id: [800, 801, 802, 500, 501][Math.floor(Math.random() * 5)],
              main: 'Clear',
              description: 'céu limpo'
            }]
          }))
        };

        setWeatherData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao buscar dados meteorológicos');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
      return <CloudLightning className="w-12 h-12 text-yellow-500" />;
    } else if (weatherId >= 300 && weatherId < 400) {
      return <CloudDrizzle className="w-12 h-12 text-blue-300" />;
    } else if (weatherId >= 500 && weatherId < 600) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <CloudSnow className="w-12 h-12 text-gray-100" />;
    } else if (weatherId >= 801 && weatherId < 900) {
      return <Cloud className="w-12 h-12 text-gray-500" />;
    } else {
      return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-xl">Carregando previsão do tempo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-800">
            O Leão do Tempo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weatherData.daily.map((day, index) => {
            const date = new Date(day.dt);
            const rainChance = Math.round(day.pop * 100);
            const avgTemp = Math.round((day.temp.max + day.temp.min) / 2);

            return (
              <Card 
                key={index} 
                className="backdrop-blur-sm bg-white/30 border-0 shadow-lg"
              >
                <CardHeader>
                  <CardTitle>
                    <div className="text-lg font-bold">
                      {index === 0 ? 'Hoje' : date.toLocaleDateString('pt-BR', { weekday: 'long' })}
                    </div>
                    <div className="text-sm text-gray-600">
                      Teresina - PI
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    {getWeatherIcon(day.weather[0].id)}
                    <div className="text-center">
                      <p className="text-2xl font-bold">{avgTemp}°C</p>
                      <p className="text-sm">
                        Min: {day.temp.min}°C | Max: {day.temp.max}°C
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Droplets className="w-4 h-4" />
                        <span>{day.humidity}%</span>
                      </div>
                      <p className="mt-2">
                        Chance de chuva: {rainChance}%
                      </p>
                      <p className={`mt-2 font-bold ${
                        rainChance >= 50 
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}>
                        {rainChance >= 50 ? 'Fica em casa mermão! 😴' : 'Vai correr mermão! 🏃'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;