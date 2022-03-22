import React, { useRef, useEffect } from "react";
import phaserGame from "../game/intro";
import Navbar from "./Navbar";
import '../styles/game.scss';


export default function Game() {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("canvasRef", canvasRef.current)
  }, [])
  let game = new phaserGame();

  return (

    <body>
      < Navbar />
      <div id="wrapper">
        <video id="camera" width="320" height="240" autoplay="true"></video>
        <canvas ref={canvasRef} id="overlay" width="320" height="240"></canvas>
      </div>
      <div id="phaser-example"></div>
    </body>
  )
}