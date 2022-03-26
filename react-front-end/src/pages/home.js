import React from 'react';
import NavButtons from '../NavButtons';
import HowTo from '../components/HowTo';
import '../styles/home.scss';
import '../styles/homeNavBar.scss'

export default function Home() {

  return (
    <body className="body">
      <video src="../assets/stars.mp4" autoPlay loop muted id="video" type="video/mp4" ></video>

      <h1 className="title">Stars n Bombs</h1>
      
      <NavButtons />
    </body >
  );
}