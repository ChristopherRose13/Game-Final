import React from 'react';
import NavButtons from '../NavButtons';
import Game from '../components/Game';
import '../styles/play.scss';


export default function Play() {

  return (
    
      <div className="play">
        <NavButtons />
        <Game />
      </div>
    
  );
}

