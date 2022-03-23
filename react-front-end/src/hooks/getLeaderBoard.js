import {useState, useEffect} from "react";
import axios from "axios";

const getLeaderBoard = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
  axios.get("/api/highscores")
  .then(res => {
    console.log(res.data);
    setData([...res.data]);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
  }, [])

  return data;
}

export default getLeaderBoard;