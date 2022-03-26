import React, { useRef, useEffect } from "react";
import phaserGame from "../game/intro2";

let game;
export default function Game() {
  
  game = new phaserGame();  
  return (
           
        <div id="phaser-example"></div>
   
  )
}