import React, { Component, useState } from 'react';
import './App.css';
import MenuList from './components/MenuList';
import Game from './components/Game';
import HowTo from './components/HowTo';
import Leaderboard from './components/Leaderboard';
// import useAxios from './hooks/useAxios'; // commented out for now

// import './styles/menu.scss';

export default function App() {
  const [step, setStep] = useState(0);

  //import data from database // Commented out for now to avoid unnecessary requests
  // const { dbState, setScores, postScoreAxios, getHighScoresAxios } = useAxios();
  // const { users, games, modes, scores } = dbState;
  // console.log(users, games, modes, scores);
  // const newScore ={
  //   user_id: 2, // hardcoded for test
  //   game_id: 1,
  //   mode_id: 3,
  //   score: 500
  // } 
  // div for test
  //<button onClick={() => { postScoreAxios(newScore) }} >Play</button> 
  //<button onClick={() => { getHighScoresAxios() }} >Play</button> 

  
  const changeStep = (step) => {
    setStep(step)
  }

  if (step === 0) {
    return (
      <div>
        <button onClick={() => { changeStep(1)  }} >Play</button> 
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




