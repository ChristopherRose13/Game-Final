import React from 'react';
import NavButtons from '../NavButtons';
import '../styles/menu.scss';
import HowTo from '../components/HowTo';


export default function howto() {

  return (
    <div className="body">
      <div className="dark">
       <img src="../assets/ArcadeTitle.png" alt="title" className="title"></img>
      </div>
      <NavButtons />
      <HowTo />
    </div >
  );
}