import React from 'react';
import NavButtons from '../NavButtons';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCamera, FaMicrophoneAlt, FaKeyboard  } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';

export default function Login() {
 const [data, setData] = useState([]);
 const { getHighScoresAxios} = useAxios;

 useEffect(() => {
  axios.get("/api/highscores")
  .then(res => {
    console.log(res.data);
    setData([...res.data]);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}, [])

// useEffect(() => {
//   getHighScoresAxios()
//   .then(res => {
//     console.log(res);
//     setData([...res]);
//   })
//   .catch(err => {
//     console.log(err);
//     return err;
//   });
// }, [])


  if(!data===[]) {
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
              {d.mode_name === "camera" ? <FaCamera /> : 
              d.mode_name === "voice" ?  <FaMicrophoneAlt /> : 
                                          <FaKeyboard />}
            </td>
            <td>{d.score}</td>
          </tr>)} 
          </tbody>        
        </table>
      </div>)
  } 
}