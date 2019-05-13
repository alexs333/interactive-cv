import Phaser, { Scene } from 'phaser'
import range from 'lodash/range'

import Player from '../sprites/Player'

export default class ActionScene extends Scene {
  constructor () {
    super({ key: 'ActionScene' })
    this.player = null
    this.walkingSound = null
  }

  create () {
    this.cameras.main.setBounds(0, 0, 3200, 100)
    this.physics.world.setBounds(0, 0, 3200, 600)

    range(1, 6).forEach(i => {
      const backgroundName = `background${i}`
      this[backgroundName] = this.add.tileSprite(400, 300, 800, 600, backgroundName)
      this[backgroundName].setScrollFactor(0, 0)
    })

    const trackNo = Phaser.Math.Between(1, 3)
    this.sound.play(`music${trackNo}`, { loop: true })

    this.player = new Player({
      scene: this,
      key: 'character',
      x: 0,
      y: 400
    })

    const ground = this.physics.add.staticGroup()
    const groundSprite = this.add.tileSprite(0, 590, (2 * 3200), 20, 'ground')
    ground.add(groundSprite)
    this.physics.add.collider(this.player, ground)

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
  }

  update () {
    const cursor = this.input.keyboard.createCursorKeys()

    this.background2.tilePositionX = this.cameras.main.scrollX * 0.1
    this.background3.tilePositionX = this.cameras.main.scrollX * 0.4
    this.background4.tilePositionX = this.cameras.main.scrollX * 0.5
    this.background5.tilePositionX = this.cameras.main.scrollX * 0.8

    if (cursor.right.isDown) {
      this.player.move('right')
    } else if (cursor.left.isDown) {
      this.player.move('left')
    } else {
      this.player.stop()
    }

    if (cursor.up.isDown && this.player.isTouchingDown()) {
      this.player.jump()
    }
  }
}
