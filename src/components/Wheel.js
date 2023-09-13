import React, { useEffect, useState } from "react";
import "../css/Wheel.css";
import ZingTouch from "zingtouch";

const Wheel = (props) => {
  const [angle, setAngle] = useState(0);

  const {
    changeMenuForward,
    active,
    currentMenu,
    theme,
    wheelColor,
    updateActiveMenu,
    changeMenuBackward,
    togglePlayPause,
    seekSongForward,
    seekSongReverse,
  } = props;

  useEffect(() => {
    const wheelControll = (e) => {
      if (e.detail.distanceFromOrigin === 0) {
        setAngle(e.detail.angle);
      }
      if (Math.abs(angle - e.detail.angle) > 300) {
        setAngle(Math.abs(e.detail.angle));
        if (e.detail.distanceFromLast === 0) {
          return;
        } else if (e.detail.distanceFromLast < 0) {
          updateActiveMenu(1, currentMenu);
        } else {
          updateActiveMenu(0, currentMenu);
        }
      } else if (Math.abs(angle - e.detail.angle) > 15) {
        setAngle(Math.abs(e.detail.angle));
        if (e.detail.distanceFromLast === 0) {
          return;
        } else if (e.detail.distanceFromLast > 0) {
          updateActiveMenu(1, currentMenu);
        } else {
          updateActiveMenu(0, currentMenu);
        }
      }
    };

    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu");
    const playPause = document.getElementById("play-pause");
    const reverse = document.getElementById("reverse");
    const forward = document.getElementById("forward");

    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInputs: 1,
      tolerance: 1,
    });

    activeRegion.bind(menuIcon, "tap", () => {
      changeMenuBackward();
    });

    activeRegion.bind(wheel, "rotate", (e) => {
      wheelControll(e);
    });

    activeRegion.bind(playPause, "tap", () => {
      togglePlayPause();
    });

    activeRegion.bind(reverse, longTapGesture, (e) => {
      seekSongReverse(e);
    });

    activeRegion.bind(forward, longTapGesture, (e) => {
      seekSongForward(e);
    });

    return () => {
      // Cleanup any event bindings or timers if needed
    };
  }, [
    angle,
    currentMenu,
    updateActiveMenu,
    changeMenuBackward,
    togglePlayPause,
    seekSongForward,
    seekSongReverse,
  ]);

  return (
    <div className="wheel-container" id="wheel-container">
      <div style={{ backgroundColor: wheelColor }} className="wheel" id="wheel">
        <div className="controll" id="menu">
          <div style={{ color: theme }}>MENU</div>
        </div>
        <div className="controll" id="forward">
          <i style={{ color: theme }} className="fas fa-fast-forward"></i>
        </div>
        <div className="controll" id="play-pause">
          <div>
            <i style={{ color: theme }} className="fas fa-play"></i>
            <i style={{ color: theme }} className="fas fa-pause"></i>
          </div>
        </div>
        <div className="controll" id="reverse">
          <i style={{ color: theme }} className="fas fa-fast-backward"></i>
        </div>
      </div>

      <div
        style={{ backgroundColor: theme }}
        className="blank"
        id="blank"
        onClick={() => {
          changeMenuForward(active, currentMenu);
        }}
      ></div>
    </div>
  );
};

export default Wheel;
