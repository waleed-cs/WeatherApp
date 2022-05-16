import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/day.css";
const Day = ({ hours, setHours, setDegree }) => {
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
    setDegree(filteredHours[0].temp_c);
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
                return <>{`${hour.time.substring(11, 13)}AM`}</>;
              } else if (hour.time.substring(11, 13) == 0) {
                return <>{12 + "AM"}</>;
              } else if (hour.time.substring(11, 13) == 12) {
                return <>{hour.time.substring(11, 13) + "PM"}</>;
              }
            })()}
          </div>
          <img src={hour.condition.icon} alt="" />
          <div className="dayDegree">{Math.round(hour.temp_c)}&deg;C</div>
          <div>{hour.condition.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Day;
