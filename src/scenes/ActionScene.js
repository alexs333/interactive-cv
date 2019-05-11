import { Scene } from 'phaser'

export default class ActionScene extends Scene {
  constructor () {
    super({ key: 'ActionScene' })
    this.player = null
    this.walkingSound = null
  }

  preload () {
    this.load.image('background', 'assets/images/background.png')
    this.load.multiatlas('character', 'assets/images/dude.json', 'assets/images')
    this.load.audio('music', 'assets/sounds/background_music.mp3')
    this.load.audio('walk', 'assets/sounds/walk.ogg')
  }

  create () {
    this.cameras.main.setBounds(0, 0, 3200, 100)
    this.physics.world.setBounds(0, 0, 3200, 600)
    this.add.tileSprite(1600, 300, 0, 0, 'background')
    this.sound.play('music', { loop: true })

    this.player = this.physics.add.sprite(0, 400, 'character', 'run/r_001.png')
    this.player.setBounce(0.3)
    this.player.setCollideWorldBounds(true)

    this.walkingSound = this.sound.add('walk', { volume: 0.3 })

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)

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
        if (this.player.isWalking && !this.walkingSound.isPlaying) {
          this.walkingSound.play()
        }
      }
    })
  }

  update () {
    const cursor = this.input.keyboard.createCursorKeys()

    if (cursor.right.isDown) {
      this.move('right')
    } else if (cursor.left.isDown) {
      this.move('left')
    } else {
      this.stop(this.player)
    }
  }

  move (direction) {
    this.player.flipX = direction === 'left'
    this.player.setVelocityX(direction === 'left' ? -260 : 260)
    this.player.anims.play('move', true)
    this.player.isWalking = true
  }

  stop () {
    this.player.setVelocityX(0)
    this.player.anims.play('stop')
    this.player.isWalking = false
  }
}
