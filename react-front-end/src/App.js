import React from 'react';
import { useContext, useState } from 'react';
import Play from './pages/play';
import HowTo from './pages/howto';
import HighScores from './pages/highscores';
import Home from './pages/home';
import { menuContext } from './providers/NavProvider';
import Multi from './pages/multi';
import phaserGame from './game/intro';
import Game from './components/Game';



export default function App() {
  const { selector } = useContext(menuContext);
  

  return (
    <div className="App">
      <div className="dark">
      <img src="../assets/dark-matter3.png" alt="title" className="title"></img>
      </div>
      {selector === "home" && <Home />}
      {selector === "play" && <Play />}
      {selector === "howto" && <HowTo />}
      {selector === "highscores" && <HighScores />}
      {selector === "single" && <Game mode={"single"}/>}
      {selector === "ai" && <Game mode={"ai"}/>}
      {selector === "multi" && <Game mode={"multi"}/>}
      {selector === "bonus" && <Game mode={"bonus"}/>}
      
    </div>
  );
}
