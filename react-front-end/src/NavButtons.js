import React from 'react';
import { useContext } from 'react';
import { menuContext } from './providers/NavProvider';
// import 'App.css';
import './styles/menu.scss';


export default function Selector() {
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);

  return (
    <div>
      <button className="buttons" onClick={onPlay}>PLAY</button>
      <button className="buttons" onClick={onHowTo}>HowTo</button>
      <button className="buttons" onClick={onHighScores}>HighScores</button>
      Context: <span className="Context"> {selector} </span>
    </div>
  );
}
