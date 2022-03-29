import React from 'react';
import NavButtons from '../NavButtons';
import HowTo from '../components/HowTo';
import '../styles/home.scss';
import '../styles/homeNavBar.scss';
import HomeNav from '../HomeNav';


export default function Home() {

  return (
    <div className="splash-screen">
      <div className="dark">
        <img src="../assets/ArcadeTitle.png" alt="splashTitle" className="splashTitle"></img>
      </div>
      <div className="center-planet">
        <img src="../assets/newPlanet.png" alt="planet" className="planet"></img>
      </div>
      <video src="../assets/stars.mp4" autoPlay loop muted id="video" type="video/mp4" ></video>
      <HomeNav />
    </div >
  );
}