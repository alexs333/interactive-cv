import Phaser from 'phaser'
import ActionScene from './scenes/ActionScene'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [ ActionScene ]
}

const game = new Phaser.Game(config)
