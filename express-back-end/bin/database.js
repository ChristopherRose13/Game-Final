require("dotenv").config();

const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams); // Can anyone help me ?
db.connect(); // I would like to take the connection directly from the server.js but I don't want to pass it every time as parameter in each function.


/** 0.01_search_users_by_email.sql
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserByEmail = function(email) {
  let lowerCaseEmail = email.toLowerCase();
  return db
    .query(`SELECT id, name, email, password
            FROM users
            WHERE email = $1;`, [lowerCaseEmail])
    .then((result) => {
      let obj = result.rows[0].email;
      if (obj === undefined) {
        return null;
      } else {
        //console.log("database", result.rows);
        return result.rows;
      }
    })
    .catch((err) => {
      console.log('Error retrieving user details - email', err.message);
    });
};
exports.getUserByEmail = getUserByEmail;

/** 0.02_search_users_by_id.sql
 * Get a single user from the database given their id.
 * @param {String} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserById = function(id) {
  return db
    .query(`SELECT id, name, email, password
            FROM users
            WHERE id = $1;`, [id])
    .then((result) => {
      let obj = result.rows[0].id;
      if (obj === undefined) {
        return null;
      } else {
        //console.log("database", result.rows);
        return result.rows;
      }
    })
    .catch((err) => {
      console.log('Error retrieving user details - id', err.message);
    });
};
exports.getUserById = getUserById;

/** 0.03_ ger all users
 * Get all users from the database.
 **/
const getUsers = function() {
  return db
    .query(`SELECT *
            FROM users;
          `)
    .then((result) => {
      console.log("database", result.rows);
      return result.rows;
      
    })
    .catch((err) => {
      console.log('Error retrieving all user', err.message);
    });
};
exports.getUsers = getUsers;

// 1 - Get HighScores limited by 10
const getHighScores = function() {
  return db
    .query(`SELECT highscores.id, highscores.user_id, highscores.game_id, highscores.mode_id, users.name, games.name as game_name, modes.name as mode_name, highscores.score
                   
    FROM highscores
    INNER JOIN modes ON highscores.mode_id = modes.id
    INNER JOIN users ON highscores.user_id = users.id
    INNER JOIN games ON highscores.game_id = games.id
    ORDER BY highscores.score DESC
    LIMIT 10;
            `)
    .then((result) => {
      console.log("database", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log('Error retrieving High Scores', err.message);
    });
};
exports.getHighScores = getHighScores;

/**
 * 2 - Insert a new High Score to the database
 * @param {{}} newHighScore An object containing all of the HighScore details.
 * @return {Promise<{}>} A promise to the HighScore Insertion.
 */
const insertHighScore = function(newHighScore) {
  return db.query(`INSERT INTO highscores (user_id, game_id, score, mode_id) 
                   VALUES ($1, $2, $3, $4)
                  RETURNING *;`, [newHighScore.user_id, newHighScore.game_id, newHighScore.score, newHighScore.mode_id])
    .then(res => {
      console.log("database", res.rows);
      return res.rows;
    })
    .catch(err => {
      console.log('Error adding a new High Score', err.message);
    }
    );
};
exports.insertHighScore = insertHighScore;

/** 5 get Games
 * Get all games from the database.
 **/
const getGames = function() {
  return db
    .query(`SELECT *
            FROM games;
          `)
    .then((result) => {
      console.log("database", result.rows);
      return result.rows;
      
    })
    .catch((err) => {
      console.log('Error retrieving all games', err.message);
    });
};
exports.getGames = getGames;

/** 6 get Modes
 * Get all modes from the database.
 **/
const getModes = function() {
  return db
    .query(`SELECT *
            FROM modes;
          `)
    .then((result) => {
      console.log("database", result.rows);
      return result.rows;
      
    })
    .catch((err) => {
      console.log('Error retrieving all modes', err.message);
    });
};
exports.getModes = getModes;

/** 7 get score
 * Get all score from the database.
 **/
const getScores = function() {
  return db
    .query(`SELECT *
            FROM highscores
            ORDER BY highscores.score DESC;
          `)
    .then((result) => {
      console.log("database", result.rows);
      return result.rows;
      
    })
    .catch((err) => {
      console.log('Error retrieving all scores', err.message);
    });
};
exports.getScores = getScores;