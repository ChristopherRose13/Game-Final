import React from 'react';
import { useContext } from 'react';
import { menuContext } from './providers/NavProvider';
// import 'App.css';
import './styles/navbar.scss';


export default function HomeNav() {
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);

  return (
    <div className="home-nav">
      <button className="home-play glow" onClick={onPlay}>PLAY</button>
      <button className="home-howTo glow" onClick={onHowTo}>HOW TO</button>
      <button className="home-leaderboard glow" onClick={onHighScores}>LEADERBOARD</button>


    </div>
  );
}