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
        const response = await axios.get(
          `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Error fetching weather data: " + err.message);
        console.error("Error:", err);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <>
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
        <div className="footer">
          This project was coded by <strong>Karima Mahmoud</strong> and is
          open-sourced on{" "}
          <a href="https://github.com/KariMaa-MahMoud/weather-app-react">
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a href="https://weather-app-react-km.netlify.app/">Netlify</a>.
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
