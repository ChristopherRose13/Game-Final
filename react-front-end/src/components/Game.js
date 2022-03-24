import React, { useRef, useEffect } from "react";
import phaserGame from "../game/intro";

// import '../styles/game.scss';
import state from "../useState";


let game;
export default function Game() {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("canvasRef", canvasRef.current)
  }, [])

  game = new phaserGame();  
  return (
           
        <div id="phaser-example"></div>
   
  )
}