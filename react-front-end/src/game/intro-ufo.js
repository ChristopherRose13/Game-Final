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

// const configuration = configFunction()
// const game = new Phaser.Game(configuration);
export default function phaserAi() {
  const { postScoreAxios, getHighScoresAxios } = useAxios();
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
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

      window.location.reload(true);
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

  console.log('COMMANDS', commands);
  const game = new Phaser.Game(config);

  let cursors;
  let player;
  let stars;
  let bombs;
  let gameOver = false;
  let score = 0;
  let kittyScore = 0;
  let scoreText;
  let kittyScoreText;
  let gameOverText;
  let seeLeaderboard;
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

  let kitty;
  let move;
  let bunnySound;
  // let detonate;


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
      // console.log(value);
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
    this.load.audio('ufo', 'assets/ufo.wav')
    this.load.audio('jump', 'assets/jump.mp3')
    this.load.audio('background', 'assets/background.mp3')
    this.load.audio('starSound', 'assets/star.mp3')
    this.load.image('ground', 'assets/platform.png');
    this.load.image('sky', 'assets/space.jpeg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');

    this.load.image('blue-sky', 'assets/sky.png');

    this.load.spritesheet('dude',
      '/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    // this.load.spritesheet('kaboom',
    //   '/assets/explosion.png',
    //   { frameWidth: 32, frameHeight: 48 }
    // );

    this.load.spritesheet('cat', 'assets/ufo.png', { frameWidth: 32, frameHeight: 48 })
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
  function create() {
    let leaderButton = document.getElementsByClassName("leaderboard")
    let howButton = document.getElementsByClassName("howTo")
    let playButton = document.getElementsByClassName("play")
    leaderButton[0].addEventListener("click", kill)
    howButton[0].addEventListener("click", kill)
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

    bunnySound = this.sound.add('ufo');

    // const newNumber = setInterval(function () {
    //   const all = Object.keys(commands);
    //   const moves = all.filter(x => x !== 'pause' && x !== 'game over');

    //   move = moves[Math.floor(Math.random() * moves.length)];
    //   console.log('THE MOVE', move);

    //   return move;

    // }, 1500);

    this.input.keyboard.on('keydown-M', () => {
      toggleVoice()
    }, this);

    this.input.keyboard.on('keydown-V', () => {
      console.log("attempting to toggle camera")
      toggleVideo();
    }, this);


    this.add.image(400, 300, 'sky');


    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    kitty = this.physics.add.sprite(300, 500, 'cat')


    if (kitty.x === 300 && kitty.y === 500) {
      setTimeout(() => {
        move = 'right';
      }, 2500)
    }


    console.log("kitty x, y==", kitty.x, kitty.y)




    player.setBounce(0.2);
    kitty.setBounce(0.2);
    player.setCollideWorldBounds(true);
    kitty.setCollideWorldBounds(true);

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

    // this.anims.create({
    //   key: 'kaboom-boom',
    //   frames: this.anims.generateFrameNumbers('kaboom', { start: 1, end: 8 }),
    //   frameRate: 10,
    //   repeat: 0
    // });

    // this.boom = this.physics.add.sprite(100, 100, 'kaboom');
    // this.boom.setScale(3);
    // this.boom.setVisible(false);
    // this.boom.on('animationcomplete', () => {
    //   this.boom.setVisible(false);

    // this.exploded = false;

    // const detonate = function (player, bombs) {
    //   // Only detonate once
    //   if (!this.exploded) {
    //     // Get the x and y of the bomb we touched
    //     const { x, y } = bombs;

    //     //  Position the explosion where the bomb was and play it
    //     this.boom.setPosition(x, y);
    //     this.boom.setVisible(true);
    //     this.boom.play('kaboom-boom');

    //     // Flip our toggle
    //     this.exploded = true;
    //   }
    // }

    // this.physics.add.overlap(player, bombs, this.detonate, null, this);

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    console.log('physics', this.physics)
    console.log('star', stars);

    stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, kitty);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(kitty, platforms);



    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(kitty, player, hitByBunny, null, this);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(kitty, stars, collectStar, null, this);
    // this.physics.add.overlap(kitty, player, hitByBunny, null, this);




    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, kitty, hitByBunny, null, this);

    scoreText = this.add.text(16, 16, 'Your Score: 0', { fontSize: '32px', fill: '#000' });
    kittyScoreText = this.add.text(450, 16, 'Alien\'s score: 0', { fontSize: '32px', fill: '#000' });

    gameOverText = this.add.text(400, 300, 'GAME OVER', { fontSize: '60px', color: '#ff0000' });
    gameOverText.setOrigin(0.5);
    gameOverText.visible = false;

    seeLeaderboard = this.add.text(400, 350, "Go to the Leaderboard to see your rank!", { fontSize: '20px', color: '#ff0000' })
    seeLeaderboard.setOrigin(0.5)
    seeLeaderboard.visible = false;
    console.log('PLAYER X', player.x)
  }




  function update() {
    if (gameOver) {
      if (keyboard) {
        mode_id = 1;
      } else if (camera) {
        mode_id = 2;
      }
      //save score and name to database
      postScoreAxios({ user_id: 2, game_id: 1, mode_id, score })
      // setScore(score)
      game.scene.pause("default")
      //send to game over screen
      return;
    }



    //alien moves
    if (kitty.x >= 780) {
      move = 'long left';
    }
    if (kitty.x <= 15) {
      move = 'baby right';
    }
    if (kitty.x > 250 && kitty.x < 300 && kitty.y > 40) {
      move = 'right jump';
    }
    if (kitty.x > 420 && kitty.x < 430 && kitty.y < 300 && kitty.y > 15) {
      move = 'right';
    }
    if (kitty.x > 347 && kitty.x < 350 && kitty.y < 474) {
      move = 'jump';
    }
    if (kitty.x > 433 && kitty.x < 440 && kitty.y < 200 && kitty.y > 20) {
      move = 'right';
    }
    if (kitty.x > 787 && kitty.y > 193) {
      move = 'left';
    }
    if (kitty.x > 374 && kitty.x < 380 && kitty.y < 263 && kitty.y > 250) {
      move = 'long left';
    }
    if (kitty.x > 725 && kitty.x < 730 && kitty.y < 171 && kitty.y > 166) {
      move = 'left jump';
    }
    if (kitty.x > 315 && kitty.x < 326 && kitty.y < 11 && kitty.y > 10.4) {
      move = 'left';
    }




    // console.log('MOVE', move)
    // console.log('KITTY X, Y', kitty.x, kitty.y)
    // console.log('KITTY Y', kitty.y)


    //alien commands:
    if (move === 'left') {
      keyboard = true;
      kitty.setVelocityX(-260);
    }
    if (move === 'right') {
      keyboard = true;
      kitty.setVelocityX(260);
    }

    if (move === 'jump') {
      keyboard = true;
      kitty.setVelocityY(-330);
    }

    if (move === 'long left') {
      keyboard = true;
      kitty.setVelocityX(-400);
    }

    if (move === 'long right') {
      keyboard = true;
      kitty.setVelocityX(400);
    }

    if (move === 'baby right') {
      keyboard = true;
      kitty.setVelocityX(100);
    }

    if (move === 'baby left') {
      keyboard = true;
      kitty.setVelocityX(-100);
    }

    if (move === 'right jump') {
      keyboard = true;
      // setTimeout(() => {
      kitty.setVelocityY(-100)

      kitty.setVelocityX(100)

    }
    if (move === 'left jump') {
      keyboard = true;

      kitty.setVelocityY(-200)

      kitty.setVelocityX(-200)

    }



    if (cursors.left.isDown || movementX === "left" || voiceMoveX === "left") {
      keyboard = true;
      player.setVelocityX(-160);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown || movementX === "right" || voiceMoveX === "right") {
      keyboard = true;
      player.setVelocityX(160);

      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if ((cursors.up.isDown && player.body.touching.down) || (movementY === "up" && player.body.touching.down) || (voiceMoveY === "up" && player.body.touching.down)) {
      keyboard = true;
      jumpSound.play()
      player.setVelocityY(-330);
    }
    // console.log('PLAYER', player.x, player.y)
  }


  // function hitByBunny() {
  //   bunnySound.play()
  //   player.setTint('#B4A7D6');
  //   score -= 10
  //   scoreText.setText('Your Score: ' + score);

  // }
  // player.clearTint();

  function collectStar(character, star) {
    if (character === player) {
      starSound.play();
      star.disableBody(true, true);
      score += 10;
      scoreText.setText('Your Score: ' + score);
    }



    if (character === kitty) {
      starSound.play();
      star.disableBody(true, true);
      kittyScore += 10;
      kittyScoreText.setText('Alien\'s Score: ' + kittyScore);
    }
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

  function hitByBunny() {
    bunnySound.play()
    player.setTint(0xff00ff);
    score -= 10
    scoreText.setText('Your Score: ' + score);

  }

  function hitBomb(player, bomb) {
    // this.exploded = true;
    // this.boom.setVisible(true);
    this.physics.pause();
    bombSound.play()
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
    gameOverText.visible = true;
    seeLeaderboard.visible = true;
   
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
  let video = document.querySelector("#camera")
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream
        toggleVideo()
      })
      .catch(function (err) {
        console.log("Something went wrong!")
        console.log(err)
      })
  }

  let canvas = document.getElementById('overlay')
  let context = canvas.getContext('2d')

  let drawLine = function (ctx, x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
  }

  let tracker = new tracking.ObjectTracker('face')
  tracker.setInitialScale(4)
  tracker.setStepSize(2)
  tracker.setEdgesDensity(0.1)

  tracker.on('track', function (event) {
    if (event.data.length === 1) {
      // Clear entire canvas  
      context.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines so we can see control points
      let leftBound = canvas.width / 3
      let rightBound = leftBound * 2
      let upBound = canvas.height / 3
      let downBound = upBound * 2

      context.strokeStyle = '#ff0000';
      drawLine(context, leftBound, 0, leftBound, canvas.height);
      drawLine(context, rightBound, 0, rightBound, canvas.height);
      drawLine(context, 0, upBound, canvas.width, upBound);
      drawLine(context, 0, downBound, canvas.width, downBound);

      // Find center of face
      let rect = event.data[0]
      let faceX = rect.x + (rect.width / 2)
      let faceY = rect.y + (rect.height / 2)

      // Draw square at center of face
      context.lineWidth = 5

      // Draw face bounding box & center point
      context.strokeStyle = '#0000ff'
      context.strokeRect(faceX - 10, faceY - 10, 20, 20)

      // Has face crossed a boundary?

      if (faceX < leftBound) {
        // console.log("FACEX", faceX)
        // console.log("FACEY", faceY)
        camera = true;
        sendMoveX('left')
      } else if (faceX > rightBound) {
        camera = true;
        sendMoveX('right')
      } else {
        sendMoveX('neutral')
      }
      if (faceY < upBound) {
        camera = true;
        sendMoveY('up')
      } else if (faceY > downBound) {
        camera = true;
        sendMoveY('down')
      } else {
        sendMoveY('neutral')
      }
    }
  })
  tracking.track(video, tracker, { camera: true, audio: false })

  function toggleVideo() {
    if (cameraOn) {
      const mediaStream = video.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach(track => track.stop())
      cameraOn = false;
      console.log("camera is off")
    } else if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream
        })
      console.log("camera is on")
      cameraOn = true;
    }
  }
}