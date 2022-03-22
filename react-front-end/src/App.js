import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';
import Game from './components/Game';
import HowTo from './components/HowTo';
import Leaderboard from './components/Leaderboard';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";



export default function App() {
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
        < Navbar />
        <HowTo />
      </div>
    )
  }

  if (step === 3) {
    return (
      <Leaderboard />
    )
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/howto">How To</Link>
            </li>
            <li>
              <Link to="/play">Play</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>


        <Routes>
          <Route exact path="/howto">
            <HowTo />
          </Route>
          <Route exact path="/play">
            <Game />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}




