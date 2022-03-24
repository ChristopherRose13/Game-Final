import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import NavProvider from "./providers/NavProvider";
// comment out it to use the previous code
import * as serviceWorker from './serviceWorker'; // What is this?
// import Phaser from 'phaser';
// import configFunction from "./game/intro"
// import tracking from "jstracking";
// import annyang from "annyang";
// import { isListening } from 'annyang';
// import phaserGame from "./game/intro";
// const configuration = configFunction()
// const game = new Phaser.Game(configuration);


ReactDOM.render(
  <NavProvider>
  
    <App />
    <div id="phaser-example"></div>
  </NavProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); // What is this?
