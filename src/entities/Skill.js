import Phaser, { GameObjects } from 'phaser'

export default class Skill extends GameObjects.Text {
  constructor (config) {
    const style = {
      fontSize: '24px',
      backgroundColor: '#6842f4',
      wordWrap: {
        width: 250
      },
      padding: {
        left: 10, right: 10, top: 10, bottom: 10
      }
    }

    super(config.scene, config.x, config.y, config.text, style)
    this.launch = this.launch.bind(this)
  }

  launch () {
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)

    this.body
      .setVelocityX(Phaser.Math.Between(-180, 180))
      .setVelocityY(-545)
  }
}
