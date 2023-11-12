import React, { useState } from 'react';
import './App.css';
import Title from './Title';

interface WeatherInfo {
  description: string;
  icon: string;
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: WeatherInfo[];
  name: string;
}

function App(): JSX.Element {
  const [city, setCity] = useState<string>('');
  const [temperature, setTemperature] = useState<number | ''>('');
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(event.target.value);
  };

  const fetchWeather = (): void => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1f1293eff73b8afa4fad6d6c279feaea`)
      .then((response) => response.json())
      .then((data: WeatherData) => {
        setWeatherInfo(data.weather[0]);
        setTemperature(data.main.temp);
        setError('');
        setInfo(data.name);
      })
      .catch(() => {
        setWeatherInfo(null);
        setError('City not found! Check spelling.');
      });
  };

  let icon: string | null = weatherInfo ? `http://openweathermap.org/img/w/${weatherInfo.icon}.png` : null;

  const showResults = (): JSX.Element | null => {
    return (
      <div className="container">
        <h1>{info} weather</h1>
        <p>Temperature: {temperature} Celsius</p>
        <p>Weather: {weatherInfo?.description}</p>
        {icon && <img src={icon} alt="Weather icon" />}
      </div>
    );
  };

  const showError = (): JSX.Element => {
    return <div>City not found! Check spelling.</div>;
  };

  return (
    <div className="app-container">
      <Title text="Aki's weather app" />
      <h1>Search the name of a city</h1>
      <div className="input-container">
      <input name="city" value={city} onChange={inputChanged} type="text" />
      <button onClick={fetchWeather}>Search</button>
      </div>
      {weatherInfo ? showResults() : null}
      {error ? showError() : null}
    </div>
  );
}

export default App;

