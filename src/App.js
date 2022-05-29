import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/app.css";
import logo from "./img/logo.svg";
import dayImage from "./img/Day.webp";
import nightImage from "./img/Night.webp";
import errorImage from "./img/Error.webp";
import sad from "./img/sad.svg";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Day from "./components/Day";
import DayInfo from "./components/DayInfo";
function App() {
  const [weather, setWeather] = useState(null);
  const [hours, setHours] = useState([]);
  const [degree_c, setDegree_c] = useState();
  const [degree_f, setDegree_f] = useState();
  const [j, setJ] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [feelslike_c, setFeelsLike_c] = useState();
  const [feelslike_f, setFeelsLike_f] = useState();
  const [dayStatus, setDayStatus] = useState("");
  let latitude = 0;
  let longitude = 0;
  const cAnimation = () => {
    setToggle(true);
    document.querySelector(".fSwitch").classList.remove("show");
    document.querySelector(".cSwitch").classList.add("show");
  };
  const fAnimation = () => {
    setToggle(false);
    document.querySelector(".cSwitch").classList.remove("show");
    document.querySelector(".fSwitch").classList.add("show");
  };

  const changeColor = () => {
    let spans = document.querySelectorAll(".switch > span");
    if (dayStatus === "day") {
      spans.forEach((span) => {
        span.classList.add("day");
      });
    } else if (dayStatus === "night") {
      spans.forEach((span) => {
        span.classList.add("night");
      });
    }
  };

  const changeBackGround = (data) => {
    let today = new Date();
    let time = today.getHours();
    let day = "";

    if (time == 0) {
      time = time + 12;
      day = "AM";
    } else if (time >= 13) {
      time = time - 12;
      day = "PM";
    } else if (time >= 0 || time <= 11) {
      day = "AM";
    }
    if (day == "PM") {
      if (time == 12) {
        document.body.style.backgroundImage = `url(${dayImage})`;
        setDayStatus("day");
      } else if (
        time >= data.forecast.forecastday[0].astro.sunset.substring(0, 2)
      ) {
        document.body.style.backgroundImage = `url(${nightImage})`;
        setDayStatus("night");
      } else {
        document.body.style.backgroundImage = `url(${dayImage})`;
        setDayStatus("day");
      }
    } else if (day == "AM") {
      if (time == 12) {
        document.body.style.backgroundImage = `url(${nightImage})`;
        setDayStatus("night");
      } else if (
        time >= data.forecast.forecastday[0].astro.sunrise.substring(0, 2)
      ) {
        document.body.style.backgroundImage = `url(${dayImage})`;
        setDayStatus("day");
      } else {
        document.body.style.backgroundImage = `url(${nightImage})`;
        setDayStatus("night");
      }
    }
    document.body.style.backgroundSize = `cover`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.objectFit = "cover";
    document.querySelector(".loader").style.display = "none";
  };

  useEffect(() => {
    if (j < 1) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            document.querySelector(".loader").style.display = "flex";
            window.scrollTo({ top: 0, behavior: "smooth" });
            getData();
          },
          function (error) {
            if (error.code == 1) {
              document.querySelector(
                ".App"
              ).style.background = `url(${errorImage})`;
              document.querySelector(".error").style.display = "flex";
              document.querySelector(".App").style.backgroundSize = `cover`;
              document.querySelector(".App").style.backgroundRepeat =
                "no-repeat";
              document.querySelector(".App").style.backgroundPosition =
                "center center";
            }
          }
        );
      } else {
      }
    }
    setJ(j + 1);
  }, []);

  useEffect(changeColor, [dayStatus]);

  const getData = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${latitude},${longitude}&days=2&aqi=no&alerts=no`
      )
      .then((data) => {
        document.querySelector(".App").style.display = "block";

        setWeather(data.data);
        let day1 = data.data.forecast.forecastday[0].hour;
        let day2 = data.data.forecast.forecastday[1].hour;
        Array.prototype.push.apply(day1, day2);
        setHours(day1);
        changeBackGround(data.data);
      });
  };

  const goLeft = () => {
    document.querySelector(".forecast").scrollLeft -= 650;
  };

  const goRight = () => {
    document.querySelector(".forecast").scrollLeft += 650;
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Weathery</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="error">
        <img src={sad} alt="sad icon" />
        <h2>Unfortunately, location is required to access</h2>
      </div>
      {weather && (
        <>
          <div className="header">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="location_section">
              <h2>
                <FontAwesomeIcon icon={faLocationDot} className="location" />
              </h2>
              <div className="location_info">
                <h2>{weather.location.country}</h2>
                <p>{weather.location.name}</p>
              </div>
            </div>
          </div>
          <div className="switch">
            <span className="cSwitch show" onClick={cAnimation}>
              &deg;C
            </span>
            <span className="fSwitch" onClick={fAnimation}>
              &deg;F
            </span>
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
          <div className="day_parent">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="arrow"
              onClick={goLeft}
            />

            <Day
              hours={hours}
              setHours={setHours}
              setDegree_c={setDegree_c}
              setDegree_f={setDegree_f}
              toggle={toggle}
              setToggle={setToggle}
              setFeelsLike_c={setFeelsLike_c}
              setFeelsLike_f={setFeelsLike_f}
            />

            <FontAwesomeIcon
              icon={faArrowRight}
              className="arrow"
              onClick={goRight}
            />
          </div>
          <DayInfo
            weather={weather}
            toggle={toggle}
            feelslike_f={feelslike_f}
            feelslike_c={feelslike_c}
            dayStatus={dayStatus}
          />
        </>
      )}
    </div>
  );
}

export default App;
