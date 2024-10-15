import React from "react";

export function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

export function formatDay(timestamp) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateObj = new Date(timestamp * 1000);
  return days[dateObj.getDay()];
}

function WeatherDetails({ weatherData }) {
  if (!weatherData) return null;

  const {
    city,
    country,
    temperature,
    description,
    wind,
    time,
    condition: { icon_url },
  } = weatherData;

  const { humidity, current } = temperature;

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
            Wind: <strong id="wind-speed">{wind.speed}km/h</strong>
          </p>
        </div>
        <div className="weather-app-temperature-container">
          <div id="icon">
            <img src={icon_url} className="weather-app-icon" alt="" />
          </div>
          <div className="weather-app-temperature" id="temperature">
            {Math.round(current)}
          </div>
          <div className="weather-app-unit">&deg;C</div>
        </div>
      </div>
    </main>
  );
}

export default WeatherDetails;
