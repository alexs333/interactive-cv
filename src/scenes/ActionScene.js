import { Scene } from 'phaser'

export default class ActionScene extends Scene {
  constructor () {
    super({ key: 'ActionScene' })
    this.player = null
    this.walkingSound = null
  }

  create () {
    this.cameras.main.setBounds(0, 0, 3200, 100)
    this.physics.world.setBounds(0, 0, 3200, 600)
    this.add.tileSprite(1600, 300, 0, 0, 'background')
    this.sound.play('music', { loop: true })

    this.player = this.physics.add.sprite(0, 400, 'character', 'run/r_001.png')
    this.player.setBounce(0.3)
    this.player.setCollideWorldBounds(true)

    const ground = this.physics.add.staticGroup()
    const groundSprite = this.add.tileSprite(0, 590, (2 * 3200), 20, 'ground')
    ground.add(groundSprite)
    this.physics.add.collider(this.player, ground)

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

    if (cursor.up.isDown && this.player.body.touching.down) {
      this.jump()
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

  jump () {
    this.player.setVelocityY(-300)
    this.sound.play('jump')
  }
}
