import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./SearchForm";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";

const apiKey = "b2a5adcct04b33178913oc335f405433"; // Replace with your API key

function WeatherApp() {
  const [city, setCity] = useState("Cairo, Egypt"); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchSubmit = (newCity) => {
    setCity(newCity);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeatherData();
  }, [city]); // Re-fetch on city change

  return (
    <div className="weather-app">
      <header>
        <SearchForm onSubmit={handleSearchSubmit} />
      </header>
      {error && <p className="error-message">{error}</p>}
      {weatherData ? (
        <>
          <WeatherDetails weatherData={weatherData} />
          <Forecast city={city} />
        </>
      ) : (
        <p className="loading-message">Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherApp;
