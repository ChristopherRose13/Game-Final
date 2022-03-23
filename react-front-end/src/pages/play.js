import React from 'react';
import NavButtons from '../NavButtons';
import Game from '../components/Game';



export default function Play() {

  return (
    <body className="body">
      <div className="play">
        <NavButtons />
        
        <Game />
      </div>
    </body>
  );
}

