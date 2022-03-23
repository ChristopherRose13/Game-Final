import React from 'react';
import NavButtons from '../NavButtons';
import Game from '../components/Game';

export default function Play() {

  return (
    <div className="play">
      <NavButtons />
      <h1> PLAY </h1>
      <Game />
    </div>
  );
}

