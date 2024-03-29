import React from "react";

const Wallpaper = (props) => {
  const { active } = props;

  return (
    <div className="music">
      <h2>Wallpaper Select</h2>
      <ul>
        {["Wallpaper 1", "Wallpaper 2", "Wallpaper 3"].map((element, index) =>
          active === index ? (
            <li key={index} className="active theme-li">
              {element}
            </li>
          ) : (
            <li className="theme-li" key={index}>
              {element}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Wallpaper;
