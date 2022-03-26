import React from 'react';
import { useContext, useState } from 'react';
import Play from './pages/play';
import HowTo from './pages/howto';
import HighScores from './pages/highscores';
import Home from './pages/home';
import { menuContext } from './providers/NavProvider';
import Multi from './pages/multi';
import phaserGame from './game/intro';



export default function App() {
  const { selector } = useContext(menuContext);
  

  return (
    <div className="App">
      {/* <h1>My App</h1> */}
      {selector === "home" && <Home />}
      {selector === "multi" && <Multi />}
      {selector === "play" && <Play />}
      {selector === "howto" && <HowTo />}
      {selector === "highscores" && <HighScores />}
      <div id="wrapper">
        <video id="camera" width="320" height="240" autoplay="true" ></video>
        <canvas id="overlay" width="320" height="240" ></canvas>
      </div>
    </div>
  );
}
