import React from 'react';
import Phaser from 'phaser';
// import configFunction from "./game/intro"
import tracking from "jstracking";
import annyang from "annyang";
import { isListening } from 'annyang';
import Leaderboard from '../components/Leaderboard';
import useAxios from '../hooks/useAxios';
import state from '../useState';
import Highscores from '../pages/highscores';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { menuContext } from '../providers/NavProvider';
import { useContext } from 'react';
// const configuration = configFunction()
// const game = new Phaser.Game(configuration);
export default function phaserMulti() {
  const { postScoreAxios, getHighScoresAxios } = useAxios();
  const { selector, onPlay, onHowTo, onHighScores } = useContext(menuContext);
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const timeOut = setTimeout(() => {
    voiceMoverX("")
  }, 1000)
  // Let's define a command.
  var commands = {
    'pause': function () { alert('Game is paused!'); },
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
    },
    'game over': function () {
      //send score to database

      gameOver = true;
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  const pauseVoice = function () {
    annyang.pause();
  }

  // Start listening.
  const startVoice = function () {
    annyang.start();
  }


  const game = new Phaser.Game(config);

  let cursors;
  let stars;
  let bombs;
  let gameOver = false;
  let score = 0;
  let scoreText;
  let gameOverText;
  let movementX;
  let movementY;
  let voiceMoveX;
  let voiceMoveY;
  let cameraOn = true;
  let bombSound;
  let jumpSound;
  let starSound;
  let backgroundMusic;
  let keyboard = false;
  let camera = false;
  let mode_id = 3;
  let player;
  let platforms;
  let firstRun = true;
  let player2;
  let isPlayer2 = false;
  let player2Position;
  let playerPosition;
  let playerDeath = false;
  let player2Death = false;
  let player2Platform;
  let playerPlatform;
  let end;

  
  let multiplayer = false;
  // let firstScene;
  // let changeScene;


  function preload() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });

    end = this.add.dom(400, 550, 'button', 'background-color: red; width: 200px; height: 28px; font: 20px monospace', 'View Your Rank');
    end.visible = false;

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    loadingText.setOrigin(0.5, 0.5);
    this.load.on('progress', function (value) {
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('fileprogress', function (file) {
      console.log(file.src);

    });
    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.audio('bombSound', 'assets/bomb.mp3')
    this.load.audio('jump', 'assets/jump.mp3')
    this.load.audio('background', 'assets/background.mp3')
    this.load.audio('starSound', 'assets/star.mp3')
    this.load.image('ground', 'assets/platform.png');
    this.load.image('sky', 'assets/space.jpeg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude2', 'assets/dude2.png', { frameWidth: 32, frameHeight: 48 })

    this.load.image('blue-sky', 'assets/sky.png');

    this.load.spritesheet('dude',
      '/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  const toggleVoice = function () {
    if (annyang.isListening()) {
      console.log("attempting to pause")
      pauseVoice()

    } else {
      annyang.isListening()
      console.log("attempting to start voice")
      startVoice();

    }
  }

  function kill() {
    game.destroy(true);
  }

  function addPlayer(self, playerInfo) {


    if (self.socket.id === playerInfo.id && playerInfo.char == 'dude2') {
      console.log("creating the seccond player")
      self.isDude2 = true;
      isPlayer2 = true;

    }

  }

  function create() {

    let leaderButton = document.getElementsByClassName("leaderboard")
    let howButton = document.getElementsByClassName("howTo")
    let playButton = document.getElementsByClassName("play")
    leaderButton[0].addEventListener("click", kill)
    howButton[0].addEventListener("click", kill)
    playButton[0].addEventListener("click", kill)
    bombSound = this.sound.add('bombSound');
    jumpSound = this.sound.add('jump');
    backgroundMusic = this.sound.add('background');
    starSound = this.sound.add('starSound');
    backgroundMusic.setVolume(0.2)
    backgroundMusic.loop = true;
    starSound.setVolume(0.5)
    jumpSound.setVolume(0.6)
    bombSound.setVolume(0.5)
    backgroundMusic.play()



    this.input.keyboard.on('keydown-M', () => {
      toggleVoice()
    }, this);

    this.input.keyboard.on('keydown-V', () => {
      console.log("attempting to toggle camera")
      toggleVideo();
    }, this);

    let exit = document.getElementsByTagName('button')

    const returnLeaderboard = function () {
      onHighScores()
      kill()
    }

    exit[3].addEventListener("click",
      returnLeaderboard
    );


    this.add.image(400, 300, 'sky');


    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.socket = io('http://localhost:8001');
    let self = this;
    // this.socket.on('currentPlayers', function (players) {
    //   Object.keys(players).forEach(function (id) {
    //     if (players[id].playerId === self.socket.id) {

    //       addPlayer(self)
    //     }
    //   });
    // })
    player2 = self.physics.add.sprite(200, 450, 'dude');
    player2.setBounce(0.2);
    player2.setTint("#7CFC00")
    player2.setCollideWorldBounds(true);


    this.socket.on('newPlayer', function (playerInfo) {
      addPlayer(self, playerInfo);
    });

    this.socket.on('disconnected', function (playerId) {

      if (playerId === self.socket.id) {
        player2.destroy();
      }

    });

    stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();
    playerPlatform = this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    
    player2Platform = this.physics.add.collider(player2, platforms);
    this.physics.add.overlap(player2, stars, collectStar, null, this);
    this.physics.add.collider(player2, bombs, secondHitBomb, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    gameOverText = this.add.text(400, 300, 'GAME OVER', { fontSize: '60px', color: '#ff0000' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;

    // seeLeaderboard = this.add.text(400, 350, "Go to the Leaderboard to see your rank!", { fontSize: '20px', color: '#ff0000' })
    // seeLeaderboard.setOrigin(0.5)
    // seeLeaderboard.visible = false;

    // firstScene = this.add.image(400, 300, 'sky');
    // firstScene.visible = true;

    // changeScene = this.add.image(400, 300, 'blue-sky');
    // changeScene.visible = false;


  }


  function update() {

    if (firstRun) {
      this.socket.on('playerMoved', function (playerInfo) {


        if (playerInfo.char === 'dude') {
          console.log("incoming: x ", playerInfo.x)
          console.log("actual: x ", player.x)
          console.log("change: ", playerInfo.x - player.x)
          if (playerInfo.x - player.x >= -2.6666666666666288 && playerInfo.x - player.x <= 2.6666666666666288) {
            player.anims.play('turn', true)
          } else
            if (player.x > playerInfo.x) {
              player.anims.play('left', true)

            } else if (player.x < playerInfo.x) {
              player.anims.play('right', true)
            } else {
              player.anims.play('turn', true)
            }

          player.setPosition(playerInfo.x, playerInfo.y)


        } else if (playerInfo.char === 'dude2') {

          if (playerInfo.x - player2.x >= -2.6666666666666288 && playerInfo.x - player2.x <= 2.6666666666666288) {
            player2.anims.play('turn', true)
          } else
            if (player2.x > playerInfo.x) {
              player2.anims.play('left', true)
            } else if (player2.x < playerInfo.x) {
              player2.anims.play('right', true)
            } else {
              player2.anims.play('turn', true)
            }

          player2.setPosition(playerInfo.x, playerInfo.y)

        }


      })
      firstRun = false;
    }

    if (gameOver) {
      if (keyboard) {
        mode_id = 1;
      } else if (camera) {
        mode_id = 2;
      }
      //save score and name to database
      postScoreAxios({ user_id: 4, game_id: 1, mode_id, score })
      // setScore(score)
      game.scene.pause("default")
      //send to game over screen
      return;

    }

    if (cursors.left.isDown || movementX === "left" || voiceMoveX === "left") {
      keyboard = true;
      if (!isPlayer2) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
      }

      if (isPlayer2) {
        player2.setVelocityX(-160);
        player2.anims.play('left', true);
      }

    }
    else if (cursors.right.isDown || movementX === "right" || voiceMoveX === "right") {
      keyboard = true;
      if (!isPlayer2) {
        player.setVelocityX(160);
        player.anims.play('right', true)
      }

      if (isPlayer2) {
        player2.setVelocityX(160);
        player2.anims.play('right', true)
      }

    }
    else {
      if (!isPlayer2) {
        player.setVelocityX(0);
        player.anims.play('turn', true)
      }

      if (isPlayer2) {
        player2.setVelocityX(0);
        player2.anims.play('turn', true)
      }

    }

    if ((cursors.up.isDown && player.body.touching.down) || (movementY === "up" && player.body.touching.down) || (voiceMoveY === "up" && player.body.touching.down)) {
      keyboard = true;
      if (!isPlayer2) {
        jumpSound.play()
        player.setVelocityY(-330);
      }

      if (isPlayer2) {
        jumpSound.play()
        if (player2.body.touching.down) {
          player2.setVelocityY(-330);
        }

      }

    }

    let x = player.x;
    let y = player.y;

    if (!isPlayer2) {

      if (playerPosition && (x !== playerPosition.x || y !== playerPosition.y)) {
        this.socket.emit('playerMovement', { x, y });
      }

      playerPosition = {
        x,
        y
      };

    }

    if (isPlayer2) {


      x = player2.x;
      y = player2.y;

      if (player2Position && (x !== player2Position.x || y !== player2Position.y)) {
        this.socket.emit('playerMovement', { x, y });
      }

      player2Position = {
        x,
        y
      }

    }


  }



  function collectStar(player, star) {
    starSound.play();
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
      // this.load.image('sky', 'assets/sky.png');
      // changeScene.visible = true;


      //  A new batch of stars to collect
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);

      });

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      let bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-100, 100), 10);
      bomb.allowGravity = false;

    }

  }

  function hitBomb(player, bomb) {
    // this.physics.pause();
    bombSound.play()
    console.log("player being hit: ", player)
    player.setTint(0xff0000);
    player.anims.play('turn');
    player.setVelocity(-100)
    player.collider = false;
    player.setCollideWorldBounds(false)
    playerDeath = true;
    this.physics.world.removeCollider(playerPlatform);
    if(player2Death) {
      end.visible = true;
      gameOver = true;
      gameOverText.visible = true;
      
      
    }
    
  }

  function secondHitBomb(player, bomb) {
    // this.physics.pause();
    bombSound.play()
    console.log("player being hit: ", player)
    player.setTint(0xff0000);
    player.anims.play('turn');
    player.setVelocity(-100)
    player.body.enable = false;
    player.setCollideWorldBounds(false)
    console.log("player platform ", player2Platform)
    this.physics.world.removeCollider(player2Platform);
    player2Death = true;
    if(playerDeath) {
      end.visible = true;
      gameOver = true;
      gameOverText.visible = true;
      
      
    }

  }

  

  // Video Functions
  const sendMoveX = function (move) {
    movementX = move;
  }
  const sendMoveY = function (move) {
    movementY = move;
  }

  const voiceMoverX = function (move) {
    voiceMoveX = move
  }

  const voiceMoverY = function (move) {
    voiceMoveY = move
  }

  const inititializeCamera = function () {

  }
  // let video = document.querySelector("#camera")
  // if (navigator.mediaDevices.getUserMedia) {
  //   navigator.mediaDevices.getUserMedia({ video: true })
  //     .then(function (stream) {
  //       video.srcObject = stream
  //       toggleVideo()
  //     })
  //     .catch(function (err) {
  //       console.log("Something went wrong!")
  //       console.log(err)
  //     })
  // }

  // let canvas = document.getElementById('overlay')
  // let context = canvas.getContext('2d')

  // let drawLine = function (ctx, x1, y1, x2, y2) {
  //   context.beginPath()
  //   context.moveTo(x1, y1)
  //   context.lineTo(x2, y2)
  //   context.stroke()
  // }

  // let tracker = new tracking.ObjectTracker('face')
  // tracker.setInitialScale(4)
  // tracker.setStepSize(2)
  // tracker.setEdgesDensity(0.1)

  // tracker.on('track', function (event) {
  //   if (event.data.length === 1) {
  //     // Clear entire canvas  
  //     context.clearRect(0, 0, canvas.width, canvas.height)

  //     // Draw grid lines so we can see control points
  //     let leftBound = canvas.width / 3
  //     let rightBound = leftBound * 2
  //     let upBound = canvas.height / 3
  //     let downBound = upBound * 2

  //     context.strokeStyle = '#ff0000';
  //     drawLine(context, leftBound, 0, leftBound, canvas.height);
  //     drawLine(context, rightBound, 0, rightBound, canvas.height);
  //     drawLine(context, 0, upBound, canvas.width, upBound);
  //     drawLine(context, 0, downBound, canvas.width, downBound);

  //     // Find center of face
  //     let rect = event.data[0]
  //     let faceX = rect.x + (rect.width / 2)
  //     let faceY = rect.y + (rect.height / 2)

  //     // Draw square at center of face
  //     context.lineWidth = 5

  //     // Draw face bounding box & center point
  //     context.strokeStyle = '#0000ff'
  //     context.strokeRect(faceX - 10, faceY - 10, 20, 20)

  //     // Has face crossed a boundary?

  //     if (faceX < leftBound) {
  //       camera = true;
  //       sendMoveX('left')
  //     } else if (faceX > rightBound) {
  //       camera = true;
  //       sendMoveX('right')
  //     } else {
  //       sendMoveX('neutral')
  //     }
  //     if (faceY < upBound) {
  //       camera = true;
  //       sendMoveY('up')
  //     } else if (faceY > downBound) {
  //       camera = true;
  //       sendMoveY('down')
  //     } else {
  //       sendMoveY('neutral')
  //     }
  //   }

  // })
  // tracking.track(video, tracker, { camera: true, audio: false })


  function toggleVideo() {
    // if (cameraOn) {
    //   const mediaStream = video.srcObject;
    //   const tracks = mediaStream.getTracks();
    //   tracks.forEach(track => track.stop())
    //   cameraOn = false;
    //   console.log("camera is off")
    // } else if (navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then(function (stream) {
    //       video.srcObject = stream
    //     })
    //   console.log("camera is on")
    //   cameraOn = true;
    // }
  }
}