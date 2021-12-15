import { playSound } from './sound'
import {
  TRANSFER_PERCENT,
  TIMER_ON_OFF,
  SOUNDS,
  SOUNDS_SWITCH,
  DEFAULT_ROUND_DURATION,
  START_VALUES,
} from '../../utils/constants'

export async function changeVolumeBg() {
  const volume = await document.querySelector('.volume-input')

  volume.addEventListener('change', () => {
    let volumeLevel = volume.value / TRANSFER_PERCENT
    localStorage.levelSoundArtQuiz = volumeLevel
    playSound(SOUNDS.soundBtn)

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
    playSound(SOUNDS.soundBtn)

    if (soundSwitch.classList.contains('switch-off')) {
      localStorage.soundMute = SOUNDS_SWITCH.off
    } else {
      localStorage.soundMute = SOUNDS_SWITCH.on
    }
  })
}

export function OnOffTime() {
  const timeSwitch = document.querySelector('.time-switch')

  timeSwitch.addEventListener('click', () => {
    timeSwitch.classList.toggle('switch-off')
    playSound(SOUNDS.soundBtn)

    if (timeSwitch.classList.contains('switch-off')) {
      localStorage.timerOnOff = TIMER_ON_OFF.off
    } else {
      localStorage.timerOnOff = TIMER_ON_OFF.on
    }
  })
}

export function changeTime() {
  const leftBtn = document.querySelector('.small-button.left')
  const rightBtn = document.querySelector('.small-button.right')
  const time = document.querySelector('.time-input')

  leftBtn.addEventListener('click', () => {
    leftBtn.nextElementSibling.stepDown()
    localStorage.roundDuration = time.value
  })

  rightBtn.addEventListener('click', () => {
    rightBtn.previousElementSibling.stepUp()
    localStorage.roundDuration = time.value
  })
}

export function loadSettings() {
  if (!localStorage.soundMute) {
    localStorage.soundMute = SOUNDS_SWITCH.on
  }

  changeVolumeBg()

  const volume = document.querySelector('.volume-input')
  volume.style.background = changeBgInputVolume(localStorage.levelSoundArtQuiz)

  const time = document.querySelector('.time-input')
  time.value = localStorage.roundDuration

  const timeSwitch = document.querySelector('.time-switch')
  if (localStorage.timerOnOff === TIMER_ON_OFF.on) {
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

  time.value = DEFAULT_ROUND_DURATION
  localStorage.roundDuration = DEFAULT_ROUND_DURATION

  volumeInput.volume = START_VALUES / TRANSFER_PERCENT

  localStorage.soundMute = SOUNDS_SWITCH.on
  soundSwitch.classList.remove('switch-off')

  localStorage.timerOnOff = TIMER_ON_OFF.off
  if (!gameSwitch.classList.contains('switch-off')) {
    gameSwitch.classList.add('switch-off')
  }

  localStorage.levelSoundArtQuiz = volumeInput.volume
  volumeInput.style.background = `linear-gradient(
    90deg,
    #14f500 0%,
    #14f500 30%,
    #ffffff 30%,
    #ffffff 100%
  )`
}
