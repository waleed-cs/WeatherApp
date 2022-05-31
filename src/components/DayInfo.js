import React, { useEffect } from "react";
import "../styles/dayInfo.css";
const DayInfo = ({ weather, toggle, feelslike_c, feelslike_f, dayStatus }) => {
  useEffect(() => {
    let divs = document.querySelectorAll(".container > div > p:first-child");
    if (dayStatus === "day") {
      divs.forEach((div) => {
        div.classList.add("day");
      });
    } else if (dayStatus === "night") {
      divs.forEach((div) => {
        div.classList.add("night");
      });
    }
  }, [dayStatus]);
  return (
    <div className="container">
      <div className="wind">
        <p>wind</p>
        <p>{weather.current.wind_kph} km/h</p>
      </div>
      <div className="humidity">
        <p>humidity</p>
        <p>{weather.current.humidity}%</p>
      </div>
      <div className="feelsLike">
        <p>Feels Like</p>
        {toggle && (
          <>
            <p>{Math.round(feelslike_c)}&deg;C</p>
          </>
        )}
        {!toggle && (
          <>
            <p>{Math.round(feelslike_f)}&deg;F</p>
          </>
        )}
      </div>
      <div className="visibility">
        <p>Visibility</p>
        <p>{weather.current.vis_km} Km</p>
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
