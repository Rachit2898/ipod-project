import React, { useState, useEffect } from "react";
import "../css/Playing.css";

const Playing = (props) => {
  const { songItems, playing, songIndex, audio, songImgUrl } = props;
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setCurrentTime(audio.currentTime);
    const intervalId = setInterval(() => {
      setCurrentTime(props.audio.currentTime);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [audio, props.audio]);

  const currentTimeRender = `${Math.floor(currentTime / 60)}:${Math.floor(
    currentTime % 60
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
  const durationRender = `${Math.floor(audio.duration / 60)}:${Math.floor(
    audio.duration % 60
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
  const percentageComplete = {
    width: `${(currentTime / audio.duration) * 100}%`,
  };

  return (
    <div className="now-playing-container">
      <div className="song-details">
        <img src={songImgUrl} alt="songImg"></img>
        <div>
          <h6>{songItems[songIndex]}</h6>
          {playing && <h4 className="play-pause-nav">Playing</h4>}
          {!playing && <h4 className="play-pause-nav">Paused</h4>}
        </div>
      </div>
      <div className="status">
        {currentTimeRender}
        <div id="progress">
          <div style={percentageComplete} id="progress-bar"></div>
        </div>
        {durationRender}
      </div>
    </div>
  );
};

export default Playing;
