import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';
import MenuList from './components/MenuList';
import Game from './components/Game';
import HowTo from './components/HowTo';
import Leaderboard from './components/Leaderboard';


export default function App() {
  const [step, setStep] = useState(0);

  const changeStep = (step) => {
    setStep(step)
  }

  if (step === 0) {
    return (
      <div>
        <button onClick={() => { changeStep(1) }} >Play</button>
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
      <HowTo />
    )
  }

  if (step === 3) {
    return (
      <Leaderboard />
    )
  }

}


