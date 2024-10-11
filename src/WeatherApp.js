import React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./SearchForm";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import axios from "axios";

const apiKey = "b2a5adcct04b33178913oc335f405433"; 

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
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const response = axios.get(
                `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`
              );
              setWeatherData(response.data);
            },
            (error) => setError(error.message)
          );
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeatherData();
  }, [city]);

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
