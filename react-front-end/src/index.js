import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Phaser from 'phaser';
import configFunction from "./game/intro"



const configuration = configFunction();
const game = new Phaser.Game(configuration);

// componentDidMount () {
//   const script = document.createElement("script");

//   let video = document.querySelector("#camera")
  
//   if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function(stream) {
//       video.srcObject = stream
//     })
//     .catch(function(err) {
//       console.log("Something went wrong!")
//       console.log(err)
//     })
//   }

//   document.body.appendChild(script);
// };
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
