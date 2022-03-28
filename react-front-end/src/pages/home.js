import React from 'react';
import NavButtons from '../NavButtons';
import HowTo from '../components/HowTo';
import '../styles/home.scss';
import '../styles/homeNavBar.scss';
import HomeNav from '../HomeNav';


export default function Home() {

  return (
    <body className="body">
      <img src="../assets/planet.png" alt="planet" className="planet"></img>
      <video src="../assets/stars.mp4" autoPlay loop muted id="video" type="video/mp4" ></video>
      <HomeNav />
    </body >
  );
}