import React from "react";

const Songs = (props) => {
  const { songItems, active } = props;

  return (
    <div className="music">
      <h3>Songs</h3>
      <ul>
        {songItems.map((element, index) =>
          active === index ? (
            <li key={index} className="active">
              &nbsp;{element}
            </li>
          ) : (
            <li key={index}>&nbsp;{element}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default Songs;
