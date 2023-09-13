import React, { useState } from "react";
import "../css/KnowMore.css";

const KnowMore = () => {
  const [divOpen, setDivOpen] = useState(false);

  const openDiv = () => {
    setDivOpen(!divOpen);
  };

  const cssProp = {
    top: divOpen ? "0px" : "-542px",
  };

  return (
    <div style={cssProp} className="information-container">
      <div className="info-div">
        <h3>Controls</h3>
        <p>
          1. To unlock screen you have to press center button and to lock screen
          you have to press menu button in the main menu.
        </p>
        <p>
          2. To play and pause music in any menu, you need to press the
          play/pause button on the bottom.
        </p>
        <p>
          3. Short pressing on forward/reverse will take you to the
          next/previous track (ONLY WHILE PLAYING).
        </p>
        <p>
          4. Long pressing on forward/reverse will seek the song forward/reverse
          (ONLY WHILE PLAYING).
        </p>
        <p>
          5. To navigate between menu items, you need to rotate on the track
          wheel.
        </p>
        <p>
          6. To go to the next menu or go inside a menu, press the center
          button, and to go to the previous menu, press the menu button.
        </p>
        <p>7. Songs do play. Please check out the settings menu.</p>
        <p>Credits: Apple, Flaticon</p>
      </div>
      <button id="info-btn" onClick={openDiv}>
        Know More
      </button>
    </div>
  );
};

export default KnowMore;
