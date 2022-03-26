import React from 'react';
import NavButtons from '../NavButtons';
import Game2 from '../components/Game2';
import '../styles/play.scss';


export default function Multi() {

  return (
    
      <div className="play">
        <img src="../assets/pink-space.jpeg" alt="stars" className="background"></img>
        <NavButtons />
        <Game2 />
      </div>
    
  );
}
