import React from 'react';
import NavButtons from '../NavButtons';
import { FaCamera, FaMicrophoneAlt, FaKeyboard } from 'react-icons/fa';
import getLeaderBoard from '../hooks/getLeaderBoard';
import '../styles/highscores.scss';

export default function Highscores() {
  const data = getLeaderBoard();
  const localData = [...data];



  const yourScore = function (data) {
    let last = data[0];
    let answer;
    for (let i = 0; i < data.length; i++) {
      if (last.id < data[i].id) {
        last = data[i];
      }
      answer = last.score;
    }
    return answer;

  }


  const yourRank = function (data) {
    let last = data[0];
    let answer;
    let rank;
    for (let i = 0; i < data.length; i++) {
      if (last.id < data[i].id) {
        last = data[i];
      }
      answer = last.score;
      rank = data.findIndex(x => x.score === answer) + 1;
    }

    return rank;
  }



  const playerScore = yourScore(data);
  const rank = yourRank(data);
  console.log("playerScore!!", playerScore)





  if (!localData === []) {
    console.log(localData);
    return (
      <div className="highScores">
        <NavButtons />
        <h1> Leader Board </h1>
        <h2>loading...</h2>
      </div>)
  } else {

    return (
      <body className="body">
        <div className="highScores">
          <NavButtons />
          <h1 className="leaderboard"> Leaderboard </h1>
          <table className="table">
            <thead>
              <tr className="heading">
                <th>Rank</th>
                <th>Name</th>
                <th>Mode</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className="results">
              {data.map((d, i) => <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.name}</td>
                <td>
                  <span>
                    {d.mode_name === "camera" ? <FaCamera /> :
                      d.mode_name === "voice" ? <FaMicrophoneAlt /> :
                        <FaKeyboard />}
                  </span>
                </td>
                <td>{d.score}</td>
              </tr>)}
            </tbody>
          </table>
          <h2 className="your-score">Your score:  {playerScore} </h2>
          <h2 className="your-rank">You are ranked # {rank}!</h2>
        </div>
      </body>)
  }

}