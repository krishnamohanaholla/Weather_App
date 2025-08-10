import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric"); // metric = °C, imperial = °F

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


  const fetchWeather = async (queryCity) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=${units}&appid=${apiKey}`;
      const res = await axios.get(url);
      setWeather(res.data);
    } catch (err) {
      alert("City not found!");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const toggleUnits = () => {
    setUnits(units === "metric" ? "imperial" : "metric");
  };

  // Fetch weather on component mount & when units change
  useEffect(() => {
    fetchWeather(city);
  }, [units]);

  return (
    <div className="weather-container">
      <h1>Weather Monitoring System</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={toggleUnits}>
        Switch to {units === "metric" ? "°F" : "°C"}
      </button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°{units === "metric" ? "C" : "F"}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} {units === "metric" ? "m/s" : "mph"}</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
