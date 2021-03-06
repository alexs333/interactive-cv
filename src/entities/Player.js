import { GameObjects } from 'phaser'

export default class Player extends GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, config.key)
    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)

    this.body
      .setBounce(0.3)
      .setCollideWorldBounds(true)

    this.walkingSound = this.scene.sound.add('walk', { volume: 0.3 })
    this.isWalking = false

    this.scene.anims.create({
      key: 'move',
      frames: this.scene.anims.generateFrameNames('character', {
        start: 1,
        end: 42,
        zeroPad: 3,
        prefix: 'r_',
        suffix: '.png'
      }),
      frameRate: 25,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNames('character', {
        start: 1,
        end: 23,
        zeroPad: 3,
        prefix: 'j_',
        suffix: '.png'
      }),
      frameRate: 50,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'stop',
      frames: [{ key: 'character', frame: 'r_012.png' }],
      frameRate: 20
    })

    this.footsteps = this.scene.time.addEvent({
      duration: 500,
      repeat: -1,
      callbackScope: this,
      callback: function () {
        if (this.isWalking && !this.walkingSound.isPlaying) {
          this.walkingSound.play()
        }
      }
    })
  }

  isTouchingDown () {
    return !!this.body.touching.down
  }

  move (direction) {
    this.flipX = direction === 'left'
    this.body.setVelocityX(direction === 'left' ? -260 : 260)
    if (this.isTouchingDown()) this.anims.play('move', true)
    this.isWalking = true
  }

  stop () {
    this.body.setVelocityX(0)
    if (this.isTouchingDown()) this.anims.play('stop', true)
    this.isWalking = false
  }

  jump () {
    this.body.setVelocityY(-300)
    this.anims.play('jump', true)
    this.scene.sound.play('jump')
  }
}
