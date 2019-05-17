import Phaser, { Scene } from 'phaser'
import range from 'lodash/range'

import config from '../experiences.json'
import Player from '../entities/Player'
import SpaceShip from '../entities/SpaceShip'

export default class ActionScene extends Scene {
  constructor () {
    super({ key: 'ActionScene' })
    this.player = null
    this.walkingSound = null
    this.noOfExperiences = config.experiences.length
    this.skillsTotal = config.experiences.reduce((carry, exp) => carry + exp.skills.length, 0)
  }

  create () {
    const gap = 900
    const gameWidth = this.noOfExperiences * gap + gap

    this.cameras.main.setBounds(0, 0, gameWidth, 100)
    this.physics.world.setBounds(0, 0, gameWidth, 600)

    this._addBackgroundLayers()
    const completedPercentageText = this._addPercentageText()
    const experiences = this._addExperienceSpaceShips(gap)

    const trackNo = Phaser.Math.Between(1, 3)
    this.sound.play(`music${trackNo}`, { loop: true, volume: 0.8 })

    this.player = new Player({
      scene: this,
      key: 'character',
      x: 0,
      y: 400
    })

    range(0, this.noOfExperiences).forEach(i => {
      const experienceName = `experience${i}`
      this.physics.add.collider(
        this.player,
        this[experienceName],
        () => {
          this[experienceName].touch()
          this._updatePercentageText(experiences, completedPercentageText)
        },
        null,
        this
      )
    })

    this.physics.add.collider(this.player, this._createGround(gameWidth))

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08)
  }

  update () {
    this._scrollBackground()

    const cursor = this.input.keyboard.createCursorKeys()
    if (cursor.right.isDown) {
      this.player.move('right')
    } else if (cursor.left.isDown) {
      this.player.move('left')
    } else {
      this.player.stop()
    }

    if (cursor.up.isDown && this.player.isTouchingDown()) {
      this.player.jump()
    }
  }

  _createGround (gameWidth) {
    const ground = this.physics.add.staticGroup()
    const groundSprite = this.add.tileSprite(0, 590, (2 * gameWidth), 20, 'ground')
    ground.add(groundSprite)

    return ground
  }

  _addBackgroundLayers () {
    range(1, 6).forEach(i => {
      const backgroundName = `background${i}`
      this[backgroundName] = this.add.tileSprite(400, 300, 800, 600, backgroundName)
      this[backgroundName].setScrollFactor(0, 0)
    })
  }

  _addPercentageText () {
    const completed = this.add.text(15, 15, 'Completed: 0%')
    completed.setScrollFactor(0)
    return completed
  }

  _updatePercentageText (experiences, text) {
    const skillsRemaining = experiences.reduce((carry, exp) => carry + exp.skills.length, 0)
    const completedPercentage = Math.ceil(100 - skillsRemaining / this.skillsTotal * 100)
    text.setText(`Completed: ${completedPercentage}%`)
  }

  _scrollBackground () {
    this.background2.tilePositionX = this.cameras.main.scrollX * 0.1
    this.background3.tilePositionX = this.cameras.main.scrollX * 0.4
    this.background4.tilePositionX = this.cameras.main.scrollX * 0.5
    this.background5.tilePositionX = this.cameras.main.scrollX * 0.8
  }

  _addExperienceSpaceShips (gap) {
    const experiences = []
    for (const [i, exp] of config.experiences.entries()) {
      const experienceName = `experience${i}`
      const ufo = this.add.image(0, 0, 'ufo')
      const flag = this.add.image(165, -120, 'flag')
      const logo = this.add.image(flag.width, -135, exp.logo)

      this[experienceName] = new SpaceShip({
        scene: this,
        x: gap * i + gap,
        y: 285,
        children: [ ufo, flag, logo ],
        skills: exp.skills
      })

      experiences.push(this[experienceName])
    }

    return experiences
  }
}
