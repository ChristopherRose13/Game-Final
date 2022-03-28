import React from 'react';
import NavButtons from '../NavButtons';
import { FaCamera, FaMicrophoneAlt, FaBrain, FaKeyboard, FaMedal } from 'react-icons/fa';
import getLeaderBoard from '../hooks/getLeaderBoard';
import '../styles/highscores.scss';

export default function Highscores() {
  const data = getLeaderBoard(); //all the data
  const localData = [...data];
  console.log("INITIAL DATA", data)
  const best = data.slice(0, 10)   //only the best 10
  console.log("best 10::", best)


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
    let rank;
    let answer = yourScore(data);
    rank = data.findIndex(x => x.score === answer) + 1;
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
      <div className="body">

        <img src="../assets/pink-space.jpeg" alt="stars" className="background"></img>

        <div className="highScores">
          <NavButtons />
          <h1 className="leaderboard"> Leaderboard </h1>
          <table className="table">
            <thead>
              <tr>
                <th className="heading">Rank</th>
                <th className="heading">Name</th>
                <th className="heading">Mode</th>
                <th className="heading">Score</th>
              </tr>
            </thead>
            <tbody className="results">
              {best.map((d, i) => <tr key={i}>
                <td>
                  {i + 1}
                  {i === 0 &&
                    <FaMedal className="gold" />
                  }
                  {i === 1 &&
                    <FaMedal className="silver" />
                  }
                  {i === 2 &&
                    <FaMedal className="bronze" />
                  }

                </td>
                <td>
                  {d.name}
                </td>
                <td>
                <span>
                    {d.mode_name === "camera" ? <FaCamera /> :
                      d.mode_name === "voice" ? <FaMicrophoneAlt /> :
                        d.mode_name === "keyboard" ? <FaKeyboard /> :
                        <FaBrain />}
                  </span>
                </td>
                <td>{d.score}</td>
              </tr>)}
            </tbody>
          </table>
          <h2 className="your-score">Your score: {playerScore} </h2>
          <h2 className="your-rank">You are ranked # {rank}!</h2>
        </div>
      </div>)
  }

}