export async function playSound(type) {
  const sounds = {
    'button-sound': './assets/sounds/zvuk-button.mp3',
    'right-answer': './assets/sounds/zvuk-pravilnogo-otveta.mp3',
    'error-answer': './assets/sounds/zvuk-nevernogo-otveta.mp3',
    'time-out': './assets/sounds/chasyi-obratnogo-otscheta.mp3',
    'win-sound': './assets/sounds/game-won.mp3',
    'grand-win': './assets/sounds/grand-pobeda-melodiya.mp3',
    'game-lost': './assets/sounds/game-lost.mp3',
  }

  const audio = new Audio()
  audio.src = sounds[type]

  if (localStorage['levelSoundArtQuiz']) {
    audio.volume = localStorage['levelSoundArtQuiz']
  }

  const playPromise = audio.play()

  if (playPromise !== null) {
    playPromise.catch(() => {
      audio.play()
    })
  }
}

export function changeVolume(level) {
  localStorage['levelSoundArtQuiz'] = level / 100
}
