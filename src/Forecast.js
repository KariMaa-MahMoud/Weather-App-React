import React, { useState, useEffect } from "react";
import axios from "axios";

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

const apiKey = "b2a5adcct04b33178913oc335f405433";

function Forecast({ city }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
        );
        setForecastData(response.data.daily);
      } catch (err) {
        console.error("Error fetching forecast data:", err);
      }
    };

    fetchForecastData();
  }, [city]);

  return (
    <>
      <div className="forcast-title">5 Days Forcast</div>
      <div className="weather-forecast">
        {forecastData &&
          forecastData.slice(0, 5).map((day) => (
            <div className="weather-forecast-day" key={day.time}>
              <div className="weather-forecast-date">{formatDay(day.time)}</div>
              <img
                src={day.condition.icon_url}
                className="weather-forecast-icon"
                alt=""
              />
              <div className="weather-forecast-temperatures">
                <div className="weather-forecast-temperature">
                  <strong>{Math.round(day.temperature.maximum)}&deg;</strong>
                </div>
                <div className="weather-forecast-temperature">
                  {Math.round(day.temperature.minimum)}&deg;
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Forecast;
