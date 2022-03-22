import React, { useState } from "react";
import Game from "./components/Game";

import Leaderboard from "./components/Leaderboard";
import HowTo from "./components/HowTo";
import phaserGame from "./game/intro";



export default function state() {
  const [step, setStep] = useState('main');

  
  const [history, setHistory] = useState([step]);


  const changeStep = (step) => {
    setStep(step)
    // setHistory(history.push(step))
  }

  if (step === 'main') {
    return (
      <div>
        <button onClick={() => {
           changeStep('play')
       }}>Play</button>
        <button onClick={() => { changeStep('howTo') }}>How To</button>
        <button onClick={() => { changeStep('leaderboard') }}>Leaderboard</button>
      </div>
    )
  }

  if (step === 'play') {
    return (
      <div class="container">
      <div>
        <button onClick={() => { changeStep('play')
      window.location.reload(true).then(console.log("loaded!"))
      }}>Play</button>
        <button onClick={() => { changeStep('howTo') 
        window.location.reload(true).then(console.log("loaded!")) }}>How To</button>
        <button onClick={() => { changeStep('leaderboard')
        window.location.reload(true).then(console.log("loaded!")) }}>Leaderboard</button>
      </div>
      <Game game={new phaserGame()}/>
      </div>
    )
  } 

  if (step === 'howTo') {
    return (
      <div class="container">
      <div>
        <button onClick={() => { changeStep('play') }}>Play</button>
        <button onClick={() => { changeStep('howTo') }}>How To</button>
        <button onClick={() => { changeStep('leaderboard') }}>Leaderboard</button>
      </div>
      <HowTo />
      </div>
    )
  }

  if (step === 'leaderboard') {
    return (
      <div class="container">
      <div>
        <button onClick={() => { changeStep('play') }}>Play</button>
        <button onClick={() => { changeStep('howTo') }}>How To</button>
        <button onClick={() => { changeStep('leaderboard') }}>Leaderboard</button>
      </div>
      <Leaderboard />
      </div>
    )
  } 
}