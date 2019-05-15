import Phaser, { GameObjects } from 'phaser'

export default class SpaceShip extends GameObjects.Container {
  constructor (config) {
    super(config.scene, config.x, config.y, config.children)
    this.touchable = true
    this.skills = config.skills

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
      if (this.skills.length > 0) {
        const skill = this.scene.add.text(
          this.x - this.width / 2,
          this.y,
          this.skills.pop(),
          {
            fontSize: '24px',
            backgroundColor: '#6842f4',
            wordWrap: {
              width: 250
            },
            padding: {
              left: 10, right: 10, top: 10, bottom: 10
            }
          }
        )
        this.scene.physics.world.enable(skill)
        skill.body.setVelocityX(Phaser.Math.Between(-180, 180))
        skill.body.setVelocityY(-550)

        this.scene.sound.play('touchSuccess', { volume: 2 })
      } else {
        this.scene.sound.play('touchEmpty')
      }

      this.touchable = false
      this.scene.time.delayedCall(700, function () { this.touchable = true }, null, this)
    }
  }
}
