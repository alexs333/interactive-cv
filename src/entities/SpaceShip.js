import { GameObjects } from 'phaser'
import Skill from './Skill'

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
    if (!this.touchable) return
    this._shake()
    if (this.skills.length > 0) {
      this._launchSkill()
      this.scene.sound.play('touchSuccess', { volume: 2 })
      if (this.skills.length === 0) this.setAlpha(0.7)
    } else {
      this.scene.sound.play('touchEmpty')
    }

    this.touchable = false
    this.scene.time.delayedCall(700, function () { this.touchable = true }, null, this)
  }

  _shake () {
    this.body.setVelocityY(-100)
    this.scene.time.delayedCall(200, function () { this.body.setVelocityY(100) }, null, this)
    this.scene.time.delayedCall(400, function () { this.body.setVelocityY(0) }, null, this)
  }

  _launchSkill () {
    const skill = new Skill({
      scene: this.scene,
      x: this.x - this.width / 2,
      y: this.y,
      text: this.skills.pop()
    })

    skill.launch()
  }
}
