import React from 'react';
import NavButtons from '../NavButtons';
import HowTo from '../components/HowTo';
import '../styles/home.scss';
import '../styles/homeNavBar.scss';


export default function Home() {

  return (
    <>
      <div className="home-container">
      <video src="../assets/stars.mp4" autoPlay loop muted id="video" type="video/mp4" ></video>      
      <NavButtons />
      </div>
    </>
  );
}