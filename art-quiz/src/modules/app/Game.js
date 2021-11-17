import images from './images'

export class Game {
  constructor(number) {
    this.number = number
    this.round = 0
    this.rounds = []
  }

  run() {
    console.log('run')
  }
}
