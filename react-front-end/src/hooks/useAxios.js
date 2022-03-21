import {useState, useEffect} from "react";
import axios from "axios";

const useAxios = () => {
  const [dbState, setDbState] = useState({ 
    users: {},
    games: {},
    modes: {},
    scores: {}
    });

  const setScores = scores => setDbState( prev => ({...prev, scores }));
  const setAllData = (users, games, modes, scores) => setDbState( prev => ({ ...prev, users, games, modes, scores }));

  // Retrieve all data from the database
  const endpointUsers = "/api/users";
  const endpointGames = "/api/games";
  const endpointModes = "/api/modes";
  const endpointScores = "/api/scores";

  useEffect(() => {
    Promise.all([
      axios.get(endpointUsers), 
      axios.get(endpointGames),
      axios.get(endpointModes),  
      axios.get(endpointScores) 
    ])
    .then((all) => {
      const users = all[0].data;
      const games = all[1].data;
      const modes = all[2].data; 
      const scores = all[3].data;      
      setAllData({...users}, {...games}, {...modes}, {...scores});
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  },[]);

  // Set the scores for a new game
  const postScoreAxios = (obj) => { //working  (user_id, game_id, mode_id, score)
    const endpointPost = "/api/highscores";
    axios
    .post(endpointPost, obj)
    .then(res => {
      console.log(res);
      return res.body;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }

  // Get all HighScores
  const getHighScoresAxios = () => {
    const endpointGet = "/api/highscores";
    axios
    .get(endpointGet)
    .then(res => {
      console.log(res);
      return res.body;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }
     
  
    return {dbState, setScores, postScoreAxios, getHighScoresAxios};
};

export default useAxios;

