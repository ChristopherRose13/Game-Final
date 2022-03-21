import {useState, useEffect} from "react";
import axios from "axios";

const useAxios = () => {
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [state, setState] = useState({ 
    users: {},
    games: {},
    modes: {},
    scores: {}
    });

  const setScores = scores => setState( prev => ({...prev, scores }));
  const setAllData = (users, games, modes, scores) => setState( prev => ({ ...prev, users, games, modes, scores }));

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
      setError(null);
      setDataLoaded(true);
      const users = all[0].data;
      const games = all[1].data;
      const modes = all[2].data; 
      const scores = all[3].data;      
      setAllData({...users}, {...games}, {...modes}, {...scores});
    })
    .catch(err => {
      setDataLoaded(false);
      setError(err.message);
    });
  },[]);

  // Set the scores for a new game

  function postAxios(user_id, game_id, mode_id, score) {
    let modeIfSuccess = "";
    let modeIfFail = "";
    const endpointPost = "/api/scores/";
    
    axios
      .post(endpointPost, {user_id, game_id, mode_id, score}) 
      .then((res) => {
        updateMemoryData(); 
        updateMemorySpots(); 
        setError(null);
        setStackMode(modeIfSuccess, true); 
        return res.body; 
      })
      .catch(err => {
        setStackMode(modeIfFail, true); 
        setError(err.message);
        return err;
      });
  }
    return {state, setScore, postAxios};
};

export default useAxios;