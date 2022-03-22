import React from 'react';
import { useContext } from 'react';
import { menuContext } from './providers/NavProvider';
// import 'App.css';

export default function Selector() {
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);

  return (
    <div>
      <button onClick={onPlay}>PLAY</button>
      <button onClick={onHowTo}>HowTo</button>
      <button onClick={onHighScores}>HighScores</button>
      Context: <span className="Context"> {selector} </span>
    </div>
  );
}
