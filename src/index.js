import Phaser from 'phaser'
import ActionScene from './scenes/ActionScene'
import LoadingScene from './scenes/LoadingScene'
import GameOverScene from './scenes/GameOverScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'cv',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  scene: [ LoadingScene, ActionScene, GameOverScene ]
}

const game = new Phaser.Game(config)
