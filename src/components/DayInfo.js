import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import "../styles/dayInfo.css";
const DayInfo = ({ weather, toggle }) => {
  return (
    <div className="container">
      <div className="wind">
        <p>wind</p>
        <p>{weather.current.wind_kph}km/h</p>
      </div>
      <div className="humidity">
        <p>humidity</p>
        <p>{weather.current.humidity}%</p>
      </div>
      <div className="feelsLike">
        <p>Feels Like</p>
        {toggle && (
          <>
            <p>{Math.round(weather.current.feelslike_c)}&deg;C</p>
          </>
        )}
        {!toggle && (
          <>
            <p>{Math.round(weather.current.feelslike_f)}&deg;F</p>
          </>
        )}
      </div>
      <div className="visibilty">
        <p>Visibilty</p>
        <p>{weather.current.vis_km}Km</p>
      </div>
      <div className="uv">
        <p>UV</p>
        <p>{weather.current.uv}</p>
      </div>
      <div className="pressure">
        <p>pressure</p>
        <p>{weather.current.pressure_mb}</p>
      </div>
    </div>
  );
};

export default DayInfo;
