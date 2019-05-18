import { GameObjects } from 'phaser'

export default class PercentageCompleted extends GameObjects.Text {
  constructor (config) {
    super(
      config.scene,
      config.x,
      config.y,
      'Completed: 0%',
      { fill: '#ffb326' }
    )

    config.scene.add.existing(this)
    this.setScrollFactor(0)
  }

  setPercentage (percentage) {
    this.setText(`Completed: ${percentage}%`)
  }
}
