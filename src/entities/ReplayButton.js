import { GameObjects } from 'phaser'

export default class ReplayButton extends GameObjects.Text {
  constructor (config) {
    super(
      config.scene,
      config.x,
      config.y,
      'Replay?',
      { fontSize: '34px', fill: '#E8E8E8' }
    )

    this.scene.add.existing(this)

    this
      .setPosition(this.x - this.width / 2, this.y / 2)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this._enterButtonHoverState())
      .on('pointerout', () => this._enterButtonRestState())
      .on('pointerdown', () => this._enterButtonActiveState())
  }

  _enterButtonHoverState () {
    this.setStyle({ fill: '#F8F8F8' })
  }

  _enterButtonRestState () {
    this.setStyle({ fill: '#E8E8E8' })
  }

  _enterButtonActiveState () {
    this.setStyle({ fill: '#fff' })
  }
}
