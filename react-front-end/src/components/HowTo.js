import React from "react";
import '../styles/menu.scss';

import state from "../useState";

export default function HowTo() {
  // const navMenu = state();
  return (

    <body className="body">
      
      <video src="./assets/backgroundVideo.mov" autoplay="true" loop="true" id="myVideo" type="video/mp4" playbackRate="0.5"></video>
      <div className="content">
        <h1 className="how-to" >How To</h1>
        <h2 className="welcome">Welcome to Stars n Bombs! The goal is to collect all the stars to gain points. Be on the lookout for falling bombs  💣  though! The game's over when you're hit by a bomb. You have 3 options to play:</h2>
        <h3 className="keyboard" >1. Keyboard:</h3>
        <p className="details">You know the deal- use your left arrow to move left, right arrow to move right, and up to jump. </p>

        <h3 className="voice-control" >2. Voice Control:</h3>
        <p className="details">This is pretty cool 😎 You can control your character with your voice! Dude will respond to the following commands:</p>
        <ul className="details">
          <li>"pause"- pauses the game</li>
          <li>"baby right"- dude moves a short distance to the right</li>
          <li>"right"- dude moves right</li>
          <li>"long right"- dude moves a long distance right</li>
          <li>"right jump"- dude jumps to the right</li>
          <li>"baby left"- dude moves a short distance to the left</li>
          <li>"left"- dude moves left</li>
          <li>"long left"- dude moves a long distance left</li>
          <li>"left jump"- dude jumps to the left</li>
        </ul>


        <h3 className="face-detection" >3. Face Detection:</h3>
        <p className="details">You can move dude around the course with facial tracking! Dude moves in the direction of your head as it moves outside the bounds of the centre square. </p>
      </div>

    </body >

  )

}