import React from 'react';
import NavButtons from '../NavButtons';
import HowTo from '../components/HowTo';
import '../styles/home.scss';
import '../styles/homeNavBar.scss'

export default function Home() {

  return (
    <Fragment>
      <video src="../assets/stars.mp4" autoplay="true" loop="true" id="video" type="video/mp4" playbackRate="0.5"></video>

      <h1 className="title">Stars n Bombs</h1>
      {/* <img src="../assets/tron.png"></img> */}
      <NavButtons />

    </Fragment >
  );
}