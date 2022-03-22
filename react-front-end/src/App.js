import React from 'react';
import { useContext } from 'react';
import Play from './pages/play';
import HowTo from './pages/howto';
import HighScores from './pages/highscores';
import { menuContext } from './providers/NavProvider';
// import 'App.css';

export default function App() {
  const { selector } = useContext(menuContext);
  
  return (
    <div className="App">
      <h1>My App</h1>
      {selector === "play" && <Play />}
      {selector === "howto" && <HowTo />}
      {selector === "highscores" && <HighScores />}
      
    </div>
  );
}

// Previous Code for reference
// #####################################
// import React, { Component, useState } from 'react';
// import './App.css';
// import state from './useState';
// import './styles/menu.scss';
// export default function App() {
//   const [step, setStep] = useState('main');
//   const navMenu = state(step);
//   return navMenu;
// }



