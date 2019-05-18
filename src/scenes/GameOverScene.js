import { Scene } from 'phaser'
import ReplayButton from '../entities/ReplayButton'
import GameOver from '../entities/GameOver'

export default class GameOverScene extends Scene {
  constructor () {
    super({ key: 'GameOverScene' })
  }

  create () {
    const backgroundMusic = this.sound.add('gameover', { loop: true, volume: 0.8 })
    backgroundMusic.play()

    const { width, height } = this.game.config

    const gameOver = new GameOver({ scene: this, x: width / 2, y: height / 2 })

    const replayText = new ReplayButton({ scene: this, x: width / 2, y: height / 2 })
    replayText.on('pointerup', () => {
      backgroundMusic.stop()
      this.scene.start('ActionScene')
    })
  }
}
