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
    
    <>
    <div class="play">
      <img src="../assets/pink-space.jpeg" alt="stars" className="background"></img>
    <NavButtons /> 
    </div> 
    <div class="frame">
      <div class="btn-group">
        <button class="button" type="button" onClick={playSinglePlayer}><h3>Single Player</h3></button><br/>
        <button class="button" type="button" onClick={playAI}><h3>Versus A.I.</h3></button><br/>
        <button class="button" type="button" onClick={playCoop}><h3>Co-op multiplayeL</h3></button><br/>
        <button class="button" type="button" onClick={playBonus}><h3>*BONUS* ship mode</h3></button>
      </div>    
    </div>
  </>
      
  );
}

