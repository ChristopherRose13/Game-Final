import React, { useRef, useEffect } from "react";
import phaserGame from "../game/intro";

import '../styles/game.scss';
import state from "../useState";

let game;
export default function Game() {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("canvasRef", canvasRef.current)
  }, [])


  if(!game) {
    game = new phaserGame();
  }

  
  return (
    
    <body>
      <div id="phaser-example"></div>
      <div id="wrapper">
        <video id="camera" width="320" height="240" autoplay="true"></video>
        <canvas ref={canvasRef} id="overlay" width="320" height="240"></canvas>
      </div>
    </body>
  )
}