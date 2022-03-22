import React, { useState } from "react";
import Game from "./components/Game";

import Leaderboard from "./components/Leaderboard";
import HowTo from "./components/HowTo";



export default function state() {
  const [step, setStep] = useState(0);


  const changeStep = (step) => {
    setStep(step)
  }

  if (step === 0) {
    return (
      <div>
        <button onClick={() => { changeStep(1) }}>Play</button>
        <button onClick={() => { changeStep(2) }}>How To</button>
        <button onClick={() => { changeStep(3) }}>Leaderboard</button>
      </div>
    )
  }

  if (step === 1) {
    return (
      <Game />
    )
  }

  if (step === 2) {
    return (
      <div>

        <HowTo />
      </div>
    )
  }

  if (step === 3) {
    return (
      <Leaderboard />
    )
  }
}