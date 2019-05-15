import { Scene } from 'phaser'
import range from 'lodash/range'

import config from '../experiences.json'

export default class LoadingScene extends Scene {
  constructor () {
    super({ key: 'LoadingScene' })
  }

  preload () {
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 270, 320, 50)

    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(250, 280, 300 * value, 30)
      percentText.setText(parseInt(value * 100) + '%')
    })

    this.load.on('complete', function () {
      [ progressBar, progressBox, loadingText, percentText ].map(item => item.destroy())
    })

    const loadBgImage = i => this.load.image(`background${i}`, `assets/images/bg_layer${i}.png`)
    range(1, 6).forEach(loadBgImage, this)

    const loadBgMusic = i => this.load.audio(`music${i}`, `assets/sounds/background_music${i}.mp3`)
    range(1, 4).forEach(loadBgMusic, this)

    const loadLogos = logoName => this.load.image(logoName, `assets/images/logos/${logoName}.png`)
    config.experiences.map(exp => exp.logo).forEach(loadLogos, this)

    this.load.image('ground', 'assets/images/tile_transparent.png')
    this.load.image('ufo', 'assets/images/spaceship.png')
    this.load.image('flag', 'assets/images/flag.png')
    this.load.multiatlas('character', 'assets/images/dude.json', 'assets/images')
    this.load.audio('walk', 'assets/sounds/walk.ogg')
    this.load.audio('jump', 'assets/sounds/jump.ogg')
    this.load.audio('touchSuccess', 'assets/sounds/touch_success.mp3')
    this.load.audio('touchEmpty', 'assets/sounds/touch_empty.ogg')
  }

  create () {
    this.scene.start('ActionScene')
  }
}
