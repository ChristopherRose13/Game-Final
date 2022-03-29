# ARCADE

Arcade it is a fun station project for anyone interested in making boredom go away.
Besides that it is a inclusive project that assist persons with disabilities  with movement controls and voice commands.
There are two games, you could play.
* Stars and Bombs (you can play, solo, cooperative with other person or against AI)
* And a Star Trek Multiplayer game that you have to use the warp speed to get to the next solar system first, divided in to teams.

## Splash Screen
!["Splash Screen"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/splashscreen.jpg)
## Menu Screen
!["Menu Screen"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/menuscreen.jpg)
## HighScores
!["Highscores"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/highscores.jpg)
## Instructions
!["Instructions"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/instructions.jpg)
## Small Screens
!["Small Screens"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/smalldevices.jpg)
## Star Trek Multiplayer
!["Star Trek Multiplayer"](https://github.com/ChristopherRose13/Game-Final/blob/master/docs/multiplayergame.jpg)

## Technology

We're using a Postgresql as database server to store our tables with users, games, scores and modes of games.
A back-end server using express to put our queries at disposal and at the same time taking care to our multiplayer sessions with websockets.
At the front-end we have a single page rendered by React and the game we use the Phaser API.
The movements and voice commands are assisted by jstracking and annyang libraries.

## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

In the browser, you can click on the button and see the data get loaded.

In the back-end there are instructions how to set the database in readmeteam.md



