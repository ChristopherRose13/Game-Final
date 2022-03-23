import React from 'react';
import NavButtons from '../NavButtons';
import { FaCamera, FaMicrophoneAlt, FaKeyboard  } from 'react-icons/fa';
import getLeaderBoard from '../hooks/getLeaderBoard';

export default function Highscores() {
  const data = getLeaderBoard();
  const localData = [...data];


  if(!localData===[]) {
    console.log(localData);
    return (
      <div className="highScores">
        <NavButtons />
        <h1> Leader Board </h1>
        <h2>loading...</h2>
      </div>)
  } else {
   
    return (
      <div className="highScores">
        <NavButtons />
        <h1> Leader Board </h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Mode</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {data.map((d, i) => <tr key={i}>
            <td>{i+1}</td>
            <td>{d.name}</td>
            <td>
              <span>
              {d.mode_name === "camera" ? <FaCamera /> : 
              d.mode_name === "voice" ?  <FaMicrophoneAlt /> : 
                                          <FaKeyboard />}
              </span>
            </td>
            <td>{d.score}</td>
          </tr>)} 
          </tbody>        
        </table>
      </div>)
  } 
}