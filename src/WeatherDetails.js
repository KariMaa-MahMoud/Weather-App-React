import React from "react";
import { formatDate } from "./utils"; // Import formatDate from utils.js

function WeatherDetails({ weatherData }) {
  if (!weatherData) return null;

  const {
    city,
    country,
    temperature,
    description,
    humidity,
    windSpeed,
    time,
    condition: { icon_url },
  } = weatherData;

  const date = new Date(time * 1000);

  return (
    <main>
      <p>
        <span className="weather-app-city" id="city">
          {city}, {country}
        </span>
      </p>
      <span className="time" id="time">
        {formatDate(date)}
      </span>
      <br />
      <div className="weather-app-data">
        <div>
          <p className="weather-app-details">
            <span id="description">{description}</span>
            <br />
            Humidity: <strong id="humidity">{humidity}%</strong>
            <br />
            Wind: <strong id="wind-speed">{windSpeed}km/h</strong>
          </p>
        </div>
        <div className="weather-app-temperature-container">
          <div id="icon">
            <img src={icon_url} className="weather-app-icon" alt="" />
          </div>
          <div className="weather-app-temperature" id="temperature">
            {Math.round(temperature)}&deg;C
          </div>
          <div className="weather-app-unit">&deg;C</div>
        </div>
      </div>
    </main>
  );
}

export default WeatherDetails;
