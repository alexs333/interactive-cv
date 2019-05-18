import { GameObjects } from 'phaser'

export default class GameOver extends GameObjects.Text {
  constructor (config) {
    super(
      config.scene,
      config.x,
      config.y,
      'ALL DONE!',
      { fontSize: '80px', fontStyle: 'bold', color: '#FF8C00' }
    )

    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)

    this.body
      .setCollideWorldBounds(true)
      .setBounce(1)

    this.setPosition(config.x - this.width / 2, config.y - this.height / 2)
  }
}
