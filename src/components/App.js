import React, { useState, useEffect } from "react";
import "../css/App.css";
import Case from "./Case.js";
import KnowMore from "./KnowMore.js";
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song2 from "../static/songs/John Denver - Country Roads.mp3";
import song3 from "../static/songs/Sigrid - High Five.mp3";
import song4 from "../static/songs/Khalid - Young Dumb Broke.mp3";
import song5 from "../static/songs/Rick Astley - Never Gonna Give You Up.mp3";
import song1Img from "../static/Post Malone - White Iverson.png";
import song2Img from "../static/John Denver - Country Roads.jpg";
import song3Img from "../static/Sigrid - High Five.png";
import song4Img from "../static/Khalid - Young Dumb Broke.jpg";
import song5Img from "../static/Never Gonna Give You Up.png";
import Wallpaper1 from "../static/wallpaper1.jpg";
import Wallpaper2 from "../static/wallpaper2.jpg";
import Wallpaper3 from "../static/wallpaper3.jpg";

const App = () => {
  const [state, setState] = useState({
    active: 0,
    menuItems: ["Now Playing", "Music", "Games", "Settings"],
    musicItems: ["All Songs", "Artist", "Albums"],
    songItemsUrl: [song1, song2, song3, song4, song5],
    songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img],
    wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3],
    songItems: [
      "Post Malone - White Iverson",
      "John Denver - Country Roads",
      "Sigrid Raabe - High Five",
      "Khalid - Young Dumb Broke",
      "Rick Astley - Never Gonna Give You Up",
    ],
    songIndex: 0,
    lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 },
    menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] },
    currentMenu: -2,
    navigationStack: [],
    songUrl: song1,
    playing: false,
    theme: "rgb(210, 210, 210)",
    audio: new Audio(song1),
    songImgUrl: song1Img,
    wheelColor: "white",
    wallpaper: 0,
    noty: false,
    notifyText: "Wallpaper Changed",
  });

  useEffect(() => {
    const { audio, currentMenu, playing, songIndex, songItemsUrl } = state;
    if (currentMenu !== -2) {
      if (playing === true) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    return () => {
      audio.pause();
      audio.src = songItemsUrl[songIndex];
    };
  }, [state]);

  const seekSongForward = (e) => {
    const {
      currentMenu,
      playing,
      audio,
      songIndex,
      songItemsUrl,
      songImgItemsUrl,
    } = state;
    if (currentMenu === -2 || playing === false) {
      return;
    }

    if (e.detail.interval < 250) {
      audio.pause();
      const nextSongIndex =
        songIndex === songItemsUrl.length - 1 ? 0 : songIndex + 1;
      const songUrl = songItemsUrl[nextSongIndex];
      const songImgUrl = songImgItemsUrl[nextSongIndex];

      setState(
        (prevState) => ({
          ...prevState,
          songIndex: nextSongIndex,
          songImgUrl,
          songUrl,
          audio: new Audio(songUrl),
        }),
        () => {
          audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  const seekSongReverse = (e) => {
    const {
      currentMenu,
      playing,
      audio,
      songIndex,
      songItemsUrl,
      songImgItemsUrl,
    } = state;
    if (currentMenu === -2 || playing === false) {
      return;
    }

    if (e.detail.interval < 250) {
      audio.pause();
      const prevSongIndex =
        songIndex === 0 ? songItemsUrl.length - 1 : songIndex - 1;
      const songUrl = songItemsUrl[prevSongIndex];
      const songImgUrl = songImgItemsUrl[prevSongIndex];

      setState(
        (prevState) => ({
          ...prevState,
          songIndex: prevSongIndex,
          songImgUrl,
          songUrl,
          audio: new Audio(songUrl),
        }),
        () => {
          audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  const togglePlayPause = () => {
    const { currentMenu, playing, audio } = state;
    if (currentMenu === -2) {
      return;
    }
    if (playing === true) {
      setState({ ...state, playing: false });
      audio.pause();
    } else {
      setState({ ...state, playing: true });
      audio.play();
    }
  };

  const updateActiveMenu = (direction, menu) => {
    const { active, lengthMenuKey } = state;
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = lengthMenuKey[menu];

    if (direction === 1) {
      if (active >= max) {
        setState({ ...state, active: min });
      } else {
        setState({ ...state, active: active + 1 });
      }
    } else {
      if (active <= min) {
        setState({ ...state, active: max });
      } else {
        setState({ ...state, active: active - 1 });
      }
    }
  };

  const setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f0f0";
    } else if (id === 1) {
      theme = "#555d50"; //black
    } else if (id === 2) {
      theme = "#ffcc00";
    } else if (id === 3) {
      theme = "#D1CDDA";
    } else if (id === 4) {
      theme = "#c4aead";
    }
    setState({ ...state, theme, noty: true, notifyText: "Theme Changed" });
  };

  const setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    } else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    setState({
      ...state,
      wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    });
  };

  const setWallpaper = (id) => {
    setState({
      ...state,
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed",
    });
  };

  const chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const { songItemsUrl, songImgItemsUrl } = state;
    const songUrl = songItemsUrl[id];
    const songImgUrl = songImgItemsUrl[id];
    state.audio.pause();
    setState(
      {
        ...state,
        currentMenu: 7,
        songUrl,
        navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl,
      },
      () => {
        state.audio.play();
      }
    );
  };

  const changeMenuBackward = () => {
    const { navigationStack, currentMenu } = state;
    const stack = navigationStack.slice();
    if (currentMenu === -2) {
      return;
    } else {
      const prevId = stack.pop();
      setState({
        ...state,
        currentMenu: prevId,
        navigationStack: stack,
        active: 0,
      });
    }
  };

  const changeMenuForward = (id, fromMenu) => {
    const { navigationStack, currentMenu, menuMapping } = state;

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(currentMenu);
      setState({
        ...state,
        currentMenu: -1,
        navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(currentMenu);
      setState({
        ...state,
        currentMenu: id,
        navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      setTheme(id);
      return;
    }

    if (fromMenu === 9) {
      setWheelColor(id);
      return;
    }

    if (fromMenu === 10) {
      setWallpaper(id);
      return;
    }

    navigationStack.push(currentMenu);

    if (fromMenu === 4) {
      chagePlayingSongFromMusicMenu(id, navigationStack);
      return;
    }

    const currentMenuID = menuMapping[fromMenu][id];
    setState({
      ...state,
      currentMenu: currentMenuID,
      navigationStack,
      active: 0,
    });
  };

  const setNoty = () => {
    setState({ ...state, noty: false });
  };

  const {
    audio,
    active,
    currentMenu,
    menuItems,
    musicItems,
    songItems,
    playing,
    songIndex,
    theme,
    songUrl,
    songImgUrl,
    wheelColor,
    wallpaper,
    wallpaperItems,
    noty,
    notifyText,
  } = state;

  return (
    <div className="App">
      <KnowMore />
      <Case
        songIndex={songIndex}
        active={active}
        menuItems={menuItems}
        musicItems={musicItems}
        currentMenu={currentMenu}
        changeMenuForward={changeMenuForward}
        changeMenuBackward={changeMenuBackward}
        updateActiveMenu={updateActiveMenu}
        togglePlayPause={togglePlayPause}
        songItems={songItems}
        playing={playing}
        theme={theme}
        audio={audio}
        songUrl={songUrl}
        songImgUrl={songImgUrl}
        seekSongForward={seekSongForward}
        seekSongReverse={seekSongReverse}
        wheelColor={wheelColor}
        wallpaper={wallpaper}
        wallpaperItems={wallpaperItems}
        noty={noty}
        setNoty={setNoty}
        notifyText={notifyText}
      />
    </div>
  );
};

export default App;
