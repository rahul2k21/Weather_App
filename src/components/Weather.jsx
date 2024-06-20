import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const Api_Key = "5c6702d62a2230528a1d25cfa75adac5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`;

  function handleOnchange(event) {
    setCity(event.target.value);
    console.log(event.target.value);
  }

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output);
        setError("");
      } else {
        setError("No data found, please enter a valid city name");
        setWeather(null);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
      setWeather(null);
    }
  }

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnchange}
          placeholder="Enter Any City Name"
        ></input>
        <button onClick={() => fetchData()}>
          <FaSearchengin />
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}

      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            ></img>
            <h3 className="desc">{weather.weather[0].description}</h3>

          </div>
          <div className="weather-temp">
            <h2>{weather.main.temp}<span>deg;C</span></h2>
          </div>
          <div className="weather-city">
            <div className="location">
              <MdLocationOn></MdLocationOn>
              </div>
              <p>{weather.name}, <span>{weather.sys.country} </span></p>

            </div>
            <div className="weather-stats">
              <div className="wind">

                <div className="wind-icon">
                  <FaWind></FaWind>
                  </div>
                  <h3 className="wind-speed">{weather.wind.speed}<span>km/h</span></h3>
                  <h3 className="wind-heading">Wind speed</h3>
                </div>
                <div className="humidity">
                  <div className="humidity-icons">
                    <WiHumidity></WiHumidity>
                    </div>
                    <h3 className="humidity-percent">{weather.main.humidity}<span>%</span></h3>
                    <h3 className="humidity-heading">Humidity</h3>

                  </div>

              </div>




        </div>
      )}
    </div>
  );
}

export default Weather;
