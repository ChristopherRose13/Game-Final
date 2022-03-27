import React, { useRef, useEffect } from "react";
import phaserGame from "../game/introMulti";
import phaserAi from "../game/intro-ufo";
import phaserSingle from "../game/intro";
import phaserBonus from "../game/intro2";
import phaserMulti from "../game/introMulti";
import state from "../useState";
import Leaderboard from "./Leaderboard";
import NavButtons from "../NavButtons";


let game;
export default function Game(props) {
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
  console.log("props", props.mode);
  switch(props.mode) {
    case 'single':
      game = new phaserSingle();
      break;
    case 'ai':
      game = new phaserAi();
      break;
    case 'coop':
      console.log("multi");
      game = new phaserMulti();
      break;
    case 'bonus':
      game = new phaserBonus();
    default:
      // game = new phaserSingle();
  }
  // game = new phaserGame();  
  return (
        <>
        <img src="../assets/arcade2.jpg" alt="stars" className="background"></img>
        <NavButtons/>
        <div id="phaser-example"></div>
        </>
   
  )
}