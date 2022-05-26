import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/day.css";
const Day = ({
  hours,
  setHours,
  setDegree_c,
  setDegree_f,
  toggle,
  setFeelsLike_c,
  setFeelsLike_f,
}) => {
  const [i, setI] = useState(0);
  const filterHours = () => {
    let date = new Date();
    let hour = date.getHours();
    let remover = [];
    for (let i = 0; i < 24; i++) {
      if (hours[i].time.substring(11, 13) < hour) {
        remover.push(hours[i]);
      }
    }
    let filteredHours = hours.filter((obj) => !remover.includes(obj));
    setHours(filteredHours);
    setFeelsLike_c(filteredHours[0].feelslike_c);
    setFeelsLike_f(filteredHours[0].feelslike_f);
    setDegree_c(filteredHours[0].temp_c);
    setDegree_f(filteredHours[0].temp_f);
  };

  useEffect(() => {
    if (i < 1) {
      filterHours();
    }
    setI(i + 1);
  }, []);

  return (
    <div className="forecast">
      {hours.map((hour) => (
        <div className="hour" key={uuidv4()}>
          <div>
            {(() => {
              if (hours[0].time === hour.time) {
                return <>Now</>;
              }
              if (
                hour.time.substring(11, 13) >= 13 &&
                hour.time.substring(11, 13) <= 23
              ) {
                return <>{hour.time.substring(11, 13) - 12 + "PM"}</>;
              } else if (
                hour.time.substring(11, 13) > 0 &&
                hour.time.substring(11, 13) <= 11
              ) {
                if (
                  hour.time.substring(11, 13) == 10 ||
                  hour.time.substring(11, 13) == 11
                ) {
                  return <>{`${hour.time.substring(11, 13)}AM`}</>;
                } else {
                  return <>{`${hour.time.substring(12, 13)}AM`}</>;
                }
              } else if (hour.time.substring(11, 13) == 0) {
                return <>{12 + "AM"}</>;
              } else if (hour.time.substring(11, 13) == 12) {
                return <>{hour.time.substring(11, 13) + "PM"}</>;
              }
            })()}
          </div>
          <img src={hour.condition.icon} alt="" />
          {toggle && (
            <>
              <div className="dayDegree">{Math.round(hour.temp_c)}&deg;C</div>
            </>
          )}
          {!toggle && (
            <>
              <div className="dayDegree">{Math.round(hour.temp_f)}&deg;F</div>
            </>
          )}
          <div>{hour.condition.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Day;
