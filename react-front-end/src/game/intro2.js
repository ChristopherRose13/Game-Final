import Phaser from 'phaser';
import tracking from "jstracking";
import annyang from "annyang";

export default function phaserGame () {

  const config = {
                  type: Phaser.AUTO,
                  width: 800,
                  height: 600,
                  parent: 'phaser-game', // id of the DOM element to insert the game into
                  physics: {
                  default: 'arcade',
                  arcade: {
                            gravity: { y: 300 },
                            debug: false
                          }
                  },
                  scene: [SceneMain] // convert to array calling a Class
                  }; // end of config variable
    
  const game = new Phaser.Game(config);
  
}

// #### Almost other file ######################################
// Will be separated into a different file later
class SceneMain extends Phaser.Scene {
  constructor() {
                  super('SceneMain'); 
                  this.cursors = null; // no more global "vars"
                  this.player = "Player1";
                  this.stars = null;
                  this.bombs = null;
                  this.gameOver = false;
                  this.score = 0;
                  this.scoreText = "High Score";
                  this.cameraOn = true;
                  this.state = {
                                movementX: "idle",
                                movementY: "idle",
                                voiceMoveX: "idle",
                                voiceMoveY: "idle"
                                }
                }
componentDidMount() {
  if (annyang) {
    // Let's define a command.
    var commands = {
      'pause': function() { alert('Game is paused!'); },
      'right': function () {
                            this.setState({voiceMoveX: "right"})
                            setTimeout(() => {
                              this.setState({voiceMoveX: "neutral"})
                            }, 1000)
                            },
      'left': function () {
                            this.setState({voiceMoveX: "left"})
                            setTimeout(() => {
                              this.setState({voiceMoveX: "neutral"})
                            }, 1000)
                          },
      'jump': function () {
                            this.setState({voiceMoveY: "up"})
                            setTimeout(() => {
                              this.setState({voiceMoveY: "neutral"})
                            }, 50)
                          },
      'right jump': function () {
                            this.setState({voiceMoveX: "right"})
                            this.setState({voiceMoveY: "up"})
                            setTimeout(() => {
                              this.setState({voiceMoveX: "neutral"})
                            }, 1300)
                            setTimeout(() => {
                              this.setState({voiceMoveY: "neutral"})
                            }, 100)
                          },
      'left jump': function () {
                            this.setState({voiceMoveX: "left"})
                            this.setState({voiceMoveY: "up"})
                            setTimeout(() => {
                            this.setState({voiceMoveX: "neutral"})
                            }, 1300)
                            setTimeout(() => {
                            this.setState({voiceMoveY: "neutral"})
                            }, 100)
                          },
      'long left': function () {
                            this.setState({voiceMoveX: "left"})
                            setTimeout(() => {
                            this.setState({voiceMoveX: "neutral"})
                            }, 1700)
                          },
      'long right': function () {
                            this.setState({voiceMoveX: "right"})
                            setTimeout(() => {
                            this.setState({voiceMoveX: "neutral"})
                            }, 1700)
                          },
      'baby right': function () {
                            this.voiceMoveX = "right";
                            setTimeout(() => {
                              this.voiceMoveX = ""
                            }, 300)
                          },
      'baby left': function () {
                            this.voiceMoveX = "left";
                            setTimeout(() => {
                              this.voiceMoveX = "";
                            }, 300)
                          },
      };
              
                    // Add our commands to annyang
                    annyang.addCommands(commands);
              
                    // Start listening.
                    annyang.start();
                  }
                }              

  preload ()  {
                this.load.image('ground', 'assets/platform.png');
                this.load.image('sky', 'assets/sky.png');
                this.load.image('ground', 'assets/platform.png');
                this.load.image('star', 'assets/star.png');
                this.load.image('bomb', 'assets/bomb.png');
                this.load.spritesheet('dude', 
                    '/assets/dude.png',
                    { frameWidth: 32, frameHeight: 48 })
              }
  create () { 
    
    const pauseVoice = function () {
                                      annyang.pause();
                                    }
    
    // Start listening.
    const startVoice = function() {
                                    annyang.start();
                                  }
    
    const toggleVoice = function () {
                                  if(annyang.isListening()) { //I think I don't have isListening()
                                    console.log("attempting to pause")
                                    pauseVoice()
                                
                                  } else {
                                    annyang.isListening() 
                                    console.log("attempting to start voice")
                                    startVoice();
                                    }
                                }

    function collectStar (player, star)
  {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  
    if (this.stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        this.stars.children.iterate(function (child) {
  
            child.enableBody(true, child.x, 0, true, true);
  
        });
  
        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  
        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 10);
        bomb.allowGravity = false;
  
    }
  }
  
  function hitBomb (player, bomb, gameOver)
  {
    this.physics.pause();
  
    player.setTint(0xff0000);
  
    player.anims.play('turn');
  
    gameOver = true;
  }
  
  // Video Functions

  const video = document.querySelector("#camera")
  if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true})
  .then(function(stream) {
    video.srcObject = stream
    toggleVideo()
  })
  .catch(function(err) {
    console.log("Something went wrong!")
    console.log(err)
  })
  }
  
  let canvas = document.getElementById('overlay')
  let context = canvas.getContext('2d')
  
  let drawLine = function(ctx, x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  }
  
  let tracker = new tracking.ObjectTracker('face')
  tracker.setInitialScale(4)
  tracker.setStepSize(2)
  tracker.setEdgesDensity(0.1)
  
  tracker.on('track', function(event) {
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
    var move
    if (faceX < leftBound) {
      move = this.setState({movementX: "left"})  
    } else if (faceX > rightBound) {
      move = this.setState({movementX: "right"})
    } else {
      move = this.setState({movementX: "neutral"})
    }
    if (faceY < upBound) {
      move = this.setState({movementY: "up"})
    } else if (faceY > downBound) {
      move = this.setState({movementY: "down"})
    } else {
      move = this.setState({movementY: "neutral"})
    }
    console.log("move",move); 
  }
  })
  tracking.track(video, tracker, { camera: true, audio: false})
  
  function toggleVideo () {
    if (this.cameraOn) {
      const mediaStream = video.srcObject;
      const tracks = mediaStream.getTracks();
      tracks.forEach(track => track.stop())
      this.cameraOn = false;
      console.log("camera is off")
    } else if (navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
      video.srcObject = stream
    })
      console.log("camera is on")
      this.cameraOn = true;
    }  
  }

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
            
              this.player = this.physics.add.sprite(100, 450, 'dude');
              
              this.player.setBounce(0.2);
              this.player.setCollideWorldBounds(true);
              
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
                  frames: [ { key: 'dude', frame: 4 } ],
                  frameRate: 20
              });
              
              this.stars = this.physics.add.group({
                  key: 'star',
                  repeat: 11,
                  setXY: { x: 12, y: 0, stepX: 70 }
              });
            
              this.stars.children.iterate(function (child) {
              
                  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              
              });
            
              this.bombs = this.physics.add.group();
              
              this.cursors = this.input.keyboard.createCursorKeys();
              this.physics.add.collider(this.player, platforms);
              this.physics.add.collider(this.stars, platforms);
              this.physics.add.collider(this.bombs, platforms);
              this.physics.add.overlap(this.player, this.stars, collectStar, null, this);
              
              this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
              
              this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            }
  update () {
              console.log("update()", this.state.movementX,this.state.movementY)
              if (this.gameOver)
              {
                  //save score and name to database
                  //send to game over screen
                  return;
              }
                      
              if (this.cursors.left.isDown || this.state.movementX==="left" || this.state.voiceMoveX==="left")
              {
                this.player.setVelocityX(-160);
              
                this.player.anims.play('left', true);
              }
              else if (this.cursors.right.isDown || this.state.movementX==="right" || this.state.voiceMoveX === "right")
              {
                this.player.setVelocityX(160);
              
                this.player.anims.play('right', true);
              }
              else
              {
                this.player.setVelocityX(0);
              
                this.player.anims.play('turn');
              }
              
              // console.log this.movementY from create() binding its context to this
                          
              if ((this.cursors.up.isDown && this.player.body.touching.down) || (this.state.movementY==="up" && this.player.body.touching.down) || (this.state.voiceMoveY==="up" && this.player.body.touching.down))
              {
                this.player.setVelocityY(-330);
              }
            
            
            }

}