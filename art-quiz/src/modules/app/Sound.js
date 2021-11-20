export class Sound {
  constructor() {
    this.sound = document.querySelector('.audio')
    this.sounds = {
      'button-sound': './assets/sounds/zvuk-button.mp3',
      'right-answer': './assets/sounds/zvuk-pravilnogo-otveta.mp3',
      'error-answer': './assets/sounds/zvuk-nevernogo-otveta.mp3',
      'time-out': './assets/sounds/chasyi-obratnogo-otscheta.mp3',
      'win-sound': './assets/sounds/game-won.mp3',
      'grand-win': './assets/sounds/grand-pobeda-melodiya.mp3',
      'game-lost': './assets/sounds/game-lost.mp3',
    }
  }
  async playSound(type) {
    this.sound.src = this.sounds[type]
    const playPromise = this.sound.play()

    if (playPromise !== null) {
      playPromise.catch(() => {
        this.sound.play()
      })
    }
  }
}

export default Sound
