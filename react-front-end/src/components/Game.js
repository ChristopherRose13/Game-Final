import React, { useRef, useEffect } from "react";
import phaserGame from "../game/introMulti";

import state from "../useState";
import Leaderboard from "./Leaderboard";


let game;
export default function Game() {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("canvasRef", canvasRef.current)
  }, [])

  window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'V' || key == 'v') {
        console.log("V pressed");
        const element = document.getElementById("wrapper");
        console.log(element);
        if(element.style.display === "block") {
        element.style.display = "none"
        } else {
        element.style.display = "block"
        }
    } 
  }
  game = new phaserGame();  
  return (
           
        <div id="phaser-example"></div>
   
  )
}