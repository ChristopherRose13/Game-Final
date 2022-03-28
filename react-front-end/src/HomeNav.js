import React from 'react';
import { useContext } from 'react';
import { menuContext } from './providers/NavProvider';
// import 'App.css';
import './styles/navbar.scss';


export default function HomeNav() {
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);

  return (
    <div className="home-nav">
      <button className="home-play" onClick={onPlay}>PLAY</button>
      <button className="home-howTo" onClick={onHowTo}>HOW TO</button>
      <button className="home-leaderboard" onClick={onHighScores}>LEADERBOARD</button>


    </div>
  );
}