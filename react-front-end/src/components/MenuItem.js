import React from "react";
import '../styles/menu.scss';
// import classNames from 'classnames';


export default function MenuItem(props) {
  // const [state, setState] = useState(false);
  // console.log("STATE", state)

  return (
    <body>
      <button className="play-button">
        PLAY
      </button>

      <button>
        HOW TO
      </button>
      <button>
        LEADERBOARD
      </button>
    </body>
  )
}

{/* <button onClick={() => setState(!state)}>How To</button> */ }