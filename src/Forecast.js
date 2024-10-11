import React, { useState, useEffect } from "react";
import { formatDay } from "./utils";
import axios from "axios";

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
  );
}

export default Forecast;
