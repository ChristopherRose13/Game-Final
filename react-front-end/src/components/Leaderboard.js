import React from "react";

import state from "../useState";


export default function Leaderboard(props) {
  const navMenu = state();
  return (

    < div >
      {navMenu}
      Leaderboard Page
    </div >
  )
};