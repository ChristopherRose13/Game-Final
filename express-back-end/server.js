// load .env data into process.env
require("dotenv").config();

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8000;
const morgan = require("morgan");
const database = require('./bin/database');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(App);
const io = new Server(httpServer, { cors:{origin: "*"} });
io.on('connection', function(socket) {
  console.log('a user connected');
  let players = {};
  players['socketId'] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id
  };
  console.log(players);

  // send the players object to the new player
  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('disconnect', function() {
    console.log('user disconnected');
    socket.broadcast.emit('newPlayer', players[socket.id]);
  });
});


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
App.use(morgan("dev"));
App.use(cors());
// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());

App.use(Express.static('public'));


// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to workkdjfgndfkjbndkfjbn!",
}));

App.get('/test', (req, res) => {
  res.render('index');
  console.log("ksjaddskjgkjfgjsjfgnsjfgnskrjgnskjerg");
});

App.get("/api/highscores", (req, res) => {
  Promise.all([
    database.getHighScores()
  ])
    .then((data) => {
      const highScores = data[0];
      // console.log("highScores route", highScores);
      res.json(highScores);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

App.post("/api/highscores", (req, res) => {
  Promise.all([
    database.insertHighScore(req.body)
  ])
    .then(() => {
      res.json({ data: "Data created!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

App.get("/api/users", (req, res) => {
  Promise.all([
    database.getUsers()
  ])
    .then((data) => {
      const users = data[0];
      // console.log("Users route", users);
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

App.get("/api/games", (req, res) => {
  Promise.all([
    database.getGames()
  ])
    .then((data) => {
      const games = data[0];
      // console.log("Games route", games);
      res.json(games);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

App.get("/api/modes", (req, res) => {
  Promise.all([
    database.getModes()
  ])
    .then((data) => {
      const modes = data[0];
      // console.log("Modes route", modes);
      res.json(modes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

App.get("/api/scores", (req, res) => {
  Promise.all([
    database.getScores()
  ])
    .then((data) => {
      const scores = data[0];
      // console.log("Scores route", scores);
      res.json(scores);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
