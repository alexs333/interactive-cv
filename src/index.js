import Phaser from 'phaser'
import ActionScene from './scenes/ActionScene'
import LoadingScene from './scenes/LoadingScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true
    }
  },
  scene: [ LoadingScene, ActionScene ]
}

const game = new Phaser.Game(config)
