export class Sound {
  constructor() {
    this.sound = new Audio()
    this.sounds = {
      'button-sound': './assets/sounds/zvuk-button.mp3',
      'right-answer': './assets/sounds/zvuk-pravilnogo-otveta.mp3',
      'error-answer': './assets/sounds/zvuk-nevernogo-otveta.mp3',
      'time-out': './assets/sounds/chasyi-obratnogo-otscheta.mp3',
      'win-sound': './assets/sounds/game-won.mp3',
      'grand-win': './assets/sounds/grand-pobeda-melodiya.mp3',
    }
  }
  playSound(type) {
    this.sound.src = this.sounds[type]
    this.sound.play()
  }
}

export default Sound
