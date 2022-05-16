import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/app.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Day from "./components/Day";
import DayInfo from "./components/DayInfo";
function App() {
  const [weather, setWeather] = useState(null);
  const [hours, setHours] = useState([]);
  const [degree_c, setDegree_c] = useState();
  const [degree_f, setDegree_f] = useState();
  const [j, setJ] = useState(0);
  const [toggle, setToggle] = useState(true);
  let latitude = 0;
  let longitude = 0;
  useEffect(() => {
    if (j < 1) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          document.querySelector(".loader").style.display = "flex";
          getData();
        });
      } else {
        document.querySelector(".error").style.display = "block";
      }
    }
    setJ(j + 1);
  }, []);

  const getData = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${latitude},${longitude}&days=2&aqi=no&alerts=no`
      )
      .then((data) => {
        document.querySelector(".App").style.display = "block";
        document.querySelector(".loader").style.display = "none";
        setWeather(data.data);
        let day1 = data.data.forecast.forecastday[0].hour;
        let day2 = data.data.forecast.forecastday[1].hour;
        Array.prototype.push.apply(day1, day2);
        setHours(day1);
      });
  };

  return (
    <div className="App">
      <div className="error">
        You have to allow access your location to get the weather
      </div>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      {weather && (
        <>
          <h2>
            {weather.location.country},{weather.location.name}
          </h2>
          <div className="switch">
            <span onClick={() => setToggle(true)}>&deg;C</span>
            <span onClick={() => setToggle(false)}>&deg;F</span>
          </div>
          {toggle && (
            <>
              <div className="degree">{Math.round(degree_c)}&deg;C</div>
            </>
          )}
          {!toggle && (
            <>
              <div className="degree">{Math.round(degree_f)}&deg;F</div>
            </>
          )}
          <Day
            hours={hours}
            setHours={setHours}
            setDegree_c={setDegree_c}
            setDegree_f={setDegree_f}
            toggle={toggle}
            setToggle={setToggle}
          />
          <DayInfo weather={weather} toggle={toggle} />
        </>
      )}
    </div>
  );
}

export default App;
