import React from 'react';
import { useContext } from 'react';
import { menuContext } from '../providers/NavProvider';
import NavButtons from '../NavButtons';
import Game from '../components/Game';
import '../styles/play.scss';
import state from '../useState';



export default function Play() {
  const { selector, onPlay, onMulti, onHowTo, onHighScores, home, playSinglePlayer, playAI, playCoop, playBonus} = useContext(menuContext);
  return (
    
      <div className="play">
        <img src="../assets/pink-space.jpeg" alt="stars" className="background"></img>
        <NavButtons />
        <h1>Stars n Bombs</h1>
        <ul>
          <li>
            <button onClick={playSinglePlayer}>Single Player</button>
          </li>
          <li>
            <button onClick={playAI}>Versus A.I.</button>
          </li>
          <li>
            <button onClick={playCoop}>Co-op multiplayer</button>
          </li>
          <li>
            <button onClick={playBonus}>*BONUS* ship mode</button>
          </li>
        </ul>
        
      </div>
    
  );
}

