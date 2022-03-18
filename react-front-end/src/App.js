import React, { Component } from 'react';
import axios from 'axios';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }
  
  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button> 
        <div>
      <video id="camera" width="640" height="480" autoPlay="true"></video>
    </div>
    
   {/*  <script>
      let video = document.querySelector("#camera")
      
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
          video.srcObject = stream
        })
        .catch(function(err) {
          console.log("Something went wrong!")
          console.log(err)
        })
      }
    </script>        */}
      </div>
    );
  }
}

export default App;
