// load .env data into process.env
require("dotenv").config();

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const morgan = require("morgan");
const database = require('./bin/database');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
App.use(morgan("dev"));

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
      console.log("highScores route", highScores);
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



App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
