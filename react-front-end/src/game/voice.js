import annyang from "annyang";
 

export default function voice () {
    // Let's define a command.
    const commands = {
      'pause': function() { alert('Game is paused!'); },
      'right': function () {
        voiceMoverX("right")
        setTimeout(() => {
          voiceMoverX("")
        }, 1000)
      },
      'left': function () {
        voiceMoverX("left")
        setTimeout(() => {
          voiceMoverX("")
        }, 1000)
      },
      'jump': function () {
        voiceMoverY("up")
        setTimeout(() => {
          voiceMoverY("")
        }, 50)
      },
      'right jump': function () {
        voiceMoverX("right")
        voiceMoverY("up")
        setTimeout(() => {
          voiceMoverX("")
        }, 1300)
        setTimeout(() => {
          voiceMoverY("")
        }, 100)
      },
      'left jump': function () {
        voiceMoverX("left")
        voiceMoverY("up")
        setTimeout(() => {
          voiceMoverX("")
        }, 1300)
        setTimeout(() => {
          voiceMoverY("")
        }, 100)
      },
      'long left': function () {
        voiceMoverX("left")
        setTimeout(() => {
          voiceMoverX("")
        }, 1700)
      },
    
      'long right': function () {
        voiceMoverX("right")
        setTimeout(() => {
          voiceMoverX("")
        }, 1700)
      },
    
      'baby right': function () {
        voiceMoverX("right")
        setTimeout(() => {
          voiceMoverX("")
        }, 300)
      },
      'baby left': function () {
        voiceMoverX("left")
        setTimeout(() => {
          voiceMoverX("")
        }, 300)
      }
    };
  
   // Add our commands to annyang
    annyang.addCommands(commands);
    
    const pauseVoice = function () {
      annyang.pause();
    }
    
    // Start listening.
    const startVoice = function() {
      annyang.start();
    }
}

