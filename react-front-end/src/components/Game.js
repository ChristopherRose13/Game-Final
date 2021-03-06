import React, { useRef, useEffect } from "react";
import phaserGame from "../game/introMulti";
import phaserAi from "../game/intro-ufo";
import phaserSingle from "../game/intro";
import phaserBonus from "../game/intro2";
import phaserMulti from "../game/introMulti";
import state from "../useState";
import Leaderboard from "./Leaderboard";
import NavButtons from "../NavButtons";
import Highscores from "../pages/highscores"

let game;
export default function Game(props) {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("canvasRef", canvasRef.current)
  }, [])

  // const returnWinners = function () {
  //   return (
  //     <Highscores />
  //   )
  // }



  window.onkeyup = function (event) {
    let key = event.key.toUpperCase();
    if (key == 'V' || key == 'v') {
      console.log("V pressed");
      const element = document.getElementById("wrapper");
      const button = document.getElementById("btnPlay");
      console.log(element);
      if (element.style.display === "block") {
        element.style.display = "none"
        button.style.zIndex = 120;
      } else {
        element.style.display = "block"
        button.style.zIndex = 1;
      }
    }
  }
  console.log("props", props.mode);
  switch (props.mode) {
    case 'single':
      game = new phaserSingle();
      break;
    case 'ai':
      game = new phaserAi();
      break;
    case 'multi':
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
      <div className="dark">
        <img src="../assets/ArcadeTitle.png" alt="title" className="title"></img>
      </div>
      <img src="../assets/arcade2b.jpg" alt="stars" className="background"></img>
      <NavButtons />
      <div id="phaser-example"></div>
      {/* <button onClick={() => { returnWinners()}}>Exit</button> */}
     
    </>

  )
}


// console.log("returnwinners==", returnWinners)



