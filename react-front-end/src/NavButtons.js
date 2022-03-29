import React from 'react';
import { useContext } from 'react';
import { menuContext } from './providers/NavProvider';
// import 'App.css';
import './styles/navbar.scss';


export default function Selector() {
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);

  return (
    <div className="navHorizontal">
      <button className="btn play glow" id="btnPlay"onClick={onPlay}>PLAY</button>
      <button className="btn howTo glow" onClick={onHowTo}>HOW TO</button>
      <button className="btn leaderboard glow" onClick={onHighScores}>LEADERBOARD</button>


    </div>
  );
}
