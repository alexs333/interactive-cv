import { Scene } from 'phaser'

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

    this.load.image('background1', 'assets/images/bg_layer1.png')
    this.load.image('background2', 'assets/images/bg_layer2.png')
    this.load.image('background3', 'assets/images/bg_layer3.png')
    this.load.image('background4', 'assets/images/bg_layer4.png')
    this.load.image('background5', 'assets/images/bg_layer5.png')
    this.load.image('ground', 'assets/images/tile_transparent.png')
    this.load.multiatlas('character', 'assets/images/dude.json', 'assets/images')
    this.load.audio('music', 'assets/sounds/background_music.mp3')
    this.load.audio('walk', 'assets/sounds/walk.ogg')
    this.load.audio('jump', 'assets/sounds/jump.ogg')
  }

  create () {
    this.scene.start('ActionScene')
  }
}
