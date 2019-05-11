import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
}

const game = new Phaser.Game(config)
let player
let walkingSound

function preload () {
  this.load.image('background', 'assets/images/background.png')
  this.load.multiatlas('character', 'assets/images/dude.json', 'assets/images')
  this.load.audio('music', 'assets/sounds/background_music.mp3')
  this.load.audio('walk', 'assets/sounds/walk.ogg')
}

function create () {
  this.cameras.main.setBounds(0, 0, 3200, 100)
  this.physics.world.setBounds(0, 0, 3200, 600)
  this.add.tileSprite(1600, 300, 0, 0, 'background')
  this.sound.play('music', { loop: true })

  player = this.physics.add.sprite(0, 400, 'character', 'run/r_001.png')
  player.setBounce(0.3)
  player.setCollideWorldBounds(true)

  walkingSound = this.sound.add('walk', { volume: 0.3 })

  this.cameras.main.startFollow(player, true, 0.08, 0.08)

  this.anims.create({
    key: 'move',
    frames: this.anims.generateFrameNames('character', {
      start: 1,
      end: 42,
      zeroPad: 3,
      prefix: 'run/r_',
      suffix: '.png'
    }),
    frameRate: 25,
    repeat: -1
  })

  this.anims.create({
    key: 'stop',
    frames: [{ key: 'character', frame: 'run/r_012.png' }],
    frameRate: 20
  })

  this.footsteps = this.time.addEvent({
    duration: 500,
    repeat: -1,
    callbackScope: this,
    callback: function () {
      if (player.isWalking && !walkingSound.isPlaying) {
        walkingSound.play()
      }
    }
  })
}

function update () {
  const cursor = this.input.keyboard.createCursorKeys()

  if (cursor.right.isDown) {
    move(player, 'right')
  } else if (cursor.left.isDown) {
    move(player, 'left')
  } else {
    stop(player)
  }
}

const move = (player, direction) => {
  player.flipX = direction === 'left'
  player.setVelocityX(direction === 'left' ? -260 : 260)
  player.anims.play('move', true)
  player.isWalking = true
}

const stop = player => {
  player.setVelocityX(0)
  player.anims.play('stop')
  player.isWalking = false
}
