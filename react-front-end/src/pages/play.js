import React from 'react';
import NavButtons from '../NavButtons';
import Game from '../components/Game';
import '../styles/play.scss';


export default function Play() {

  return (
    
      <div className="play">
        <img src="../assets/pink-space.jpeg" alt="stars" className="background"></img>
        <NavButtons />
        <Game />
      </div>
    
  );
}

