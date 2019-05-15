import { GameObjects } from 'phaser'

export default class SpaceShip extends GameObjects.Container {
  constructor (config) {
    super(config.scene, config.x, config.y, config.children)
    this.noOfSkills = 3
    this.touchable = true

    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)

    this.body
      .setAllowGravity(false)
      .setImmovable(true)

    this.body.width = 200
    this.setSize(200, 0)

    this.touch = this.touch.bind(this)
  }

  touch () {
    if (this.touchable) {
      if (this.noOfSkills > 0) {
        this.noOfSkills--
        this.scene.sound.play('touchSuccess', { volume: 2 })
      } else {
        this.scene.sound.play('touchEmpty')
      }

      this.touchable = false
      this.scene.time.delayedCall(700, function () { this.touchable = true }, null, this)
    }
  }
}
