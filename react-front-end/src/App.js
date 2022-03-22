import React, { Component, useState } from 'react';
import './App.css';

import state from './useState';



// import './styles/menu.scss';

export default function App() {
  const [step, setStep] = useState(0);


  const navMenu = state();
  return navMenu;

}



