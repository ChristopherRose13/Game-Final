import React from 'react';
import NavButtons from '../NavButtons';
import '../styles/menu.scss';
import HowTo from '../components/HowTo';


export default function howto() {

  return (
    <div className="body">
      <NavButtons />
      <HowTo />
    </div >
  );
}