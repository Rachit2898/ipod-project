import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import BatImg from "../static/battery.png";

const Navbar = ({ noty, setNoty, playing, notifyText }) => {
  const [time, setTime] = useState(getCurrentTime());
  let stateId = "";

  useEffect(() => {
    if (!noty) {
      stateId = setInterval(() => {
        setTime(getCurrentTime());
      }, 60000);
    }

    return () => {
      if (!noty) {
        clearInterval(stateId);
      }
    };
  }, [noty]);

  useEffect(() => {
    if (noty) {
      setTimeout(() => {
        setNoty();
      }, 1000);
    }
  }, [noty, setNoty]);

  function getCurrentTime() {
    const today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    if (today.getMinutes() < 10) {
      time = today.getHours() + ":0" + today.getMinutes();
    }
    return time;
  }

  return (
    <div className="bar">
      <h5 className="heading">
        iPod <i className="fas fa-wifi"></i>
      </h5>
      {noty ? (
        <h5 className="notification">{notifyText}</h5>
      ) : (
        <h3 className="time">{time}</h3>
      )}
      <div className="right-container-nav">
        {playing ? (
          <h5 className="play-pause-nav">
            <i className="fas fa-play"></i>
          </h5>
        ) : (
          <h5 className="play-pause-nav">
            <i className="fas fa-pause"></i>{" "}
          </h5>
        )}
        <img className="battery" src={BatImg} alt="Battery" />
      </div>
    </div>
  );
};

export default Navbar;
