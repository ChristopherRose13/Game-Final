import React from 'react';
import { createContext, useState } from 'react';
// Create a Context
export const menuContext = createContext();

// Create a Component wrapper from Context.Provider
export default function SelectorProvider(props) {

  // Here is our Shared State Object
  const [selector, setSelector] = useState("home");

  // Functions to change  the selector state item
const home = function() {
  setSelector("home")
}
const onMulti = function() {
  setSelector("multi")
}
  const onPlay = function() {
    setSelector("play");
  };
  const onHowTo = function() {
    setSelector("howto");
  };
  const onHighScores = function() {
    setSelector("highscores");
  };

  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = { selector, onPlay, onMulti, onHowTo, onHighScores, home };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <menuContext.Provider value={providerData}>
      {props.children}
    </menuContext.Provider>
  );
}