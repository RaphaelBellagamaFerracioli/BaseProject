import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const REACT_APP_OPENWEATHER_API_KEY = 'e03348d33928f13ba38fdcd705ff296f';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = REACT_APP_OPENWEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=campinas&appid=${apiKey}&units=metric`);

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        // Tratamento para respostas inválidas
        if (data.cod !== 200) {
          throw new Error(data.message);
        }

        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) return <p>Erro ao carregar previsão do tempo: {error}</p>;
  if (!weather || !weather.main) return <p>Carregando previsão do tempo...</p>;

  return (
    <div>
      <p>Temperatura: {weather.main.temp}°C</p>
      <p>Cidade: {weather.name}</p>
    </div>
  );
};

export default Weather;