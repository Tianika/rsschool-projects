import { playSound } from './sound'

export async function changeVolumeBg() {
  const volume = await document.querySelector('.volume-input')

  volume.addEventListener('change', () => {
    let volumeLevel = volume.value / 100
    localStorage['levelSoundArtQuiz'] = volumeLevel
    playSound('button-sound')

    volume.style.background = changeBgInputVolume(volumeLevel)
  })
}

function changeBgInputVolume(value) {
  return `linear-gradient(
      90deg,
      #14f500 0%,
      #14f500 ${value * 100}%,
      #ffffff ${value * 100}%,
      #ffffff 100%
    )`
}

export function OnOffSound() {
  const soundSwitch = document.querySelector('.sound-switch')

  soundSwitch.addEventListener('click', () => {
    soundSwitch.classList.toggle('switch-off')
    playSound('button-sound')

    if (soundSwitch.classList.contains('switch-off')) {
      localStorage.soundMute = 'switch-off'
    } else {
      localStorage.soundMute = ''
    }
  })
}

export function OnOffTime() {
  const timeSwitch = document.querySelector('.time-switch')

  timeSwitch.addEventListener('click', () => {
    timeSwitch.classList.toggle('switch-off')
    playSound('button-sound')

    if (timeSwitch.classList.contains('switch-off')) {
      localStorage.timerOnOff = 'switch-off'
    } else {
      localStorage.timerOnOff = ' '
    }
  })
}

export function changeTime() {
  const leftBtn = document.querySelector('.small-button.left')
  const rightBtn = document.querySelector('.small-button.right')
  const time = document.querySelector('.time-input')

  leftBtn.addEventListener('click', () => {
    leftBtn.nextElementSibling.stepDown()
    localStorage['roundDuration'] = time.value
  })

  rightBtn.addEventListener('click', () => {
    rightBtn.previousElementSibling.stepUp()
    localStorage['roundDuration'] = time.value
  })
}

export function loadSettings() {
  if (!localStorage.soundMute) {
    localStorage.soundMute = ''
  }

  changeVolumeBg()

  const volume = document.querySelector('.volume-input')
  volume.style.background = changeBgInputVolume(
    localStorage['levelSoundArtQuiz']
  )

  const time = document.querySelector('.time-input')
  time.value = localStorage['roundDuration']

  const timeSwitch = document.querySelector('.time-switch')
  if (localStorage['timerOnOff'] === ' ') {
    timeSwitch.classList.remove('switch-off')
  } else {
    timeSwitch.classList.add('switch-off')
  }
}

export function defaultSettings() {
  const time = document.querySelector('.time-input')
  const volumeInput = document.querySelector('.volume-input')
  const soundSwitch = document.querySelector('.sound-switch')
  const gameSwitch = document.querySelector('.time-switch')

  time.value = 20
  localStorage['roundDuration'] = 20

  volumeInput.volume = 0.3

  localStorage.soundMute = ''
  soundSwitch.classList.remove('switch-off')

  localStorage['timerOnOff'] = 'switch-off'
  if (!gameSwitch.classList.contains('switch-off')) {
    gameSwitch.classList.add('switch-off')
  }

  localStorage['levelSoundArtQuiz'] = volumeInput.volume
  volumeInput.style.background = `linear-gradient(
    90deg,
    #14f500 0%,
    #14f500 30%,
    #ffffff 30%,
    #ffffff 100%
  )`
}