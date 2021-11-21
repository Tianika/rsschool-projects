import { playSound, changeVolume } from './sound'

export function changeVolumeBg() {
  const volume = document.querySelector('.volume-input')

  volume.addEventListener('change', () => {
    let volumeLevel = volume.value
    changeVolume(volumeLevel)
    playSound('button-sound')

    volume.style.background = changeBgInputVolume(volumeLevel)
  })

  function changeBgInputVolume(value) {
    return `linear-gradient(
      90deg,
      #14f500 0%,
      #14f500 ${value}%,
      #ffffff ${value}%,
      #ffffff 100%
    )`
  }
}

export function OnOffSound() {
  const soundSwitch = document.querySelector('.sound-switch')

  soundSwitch.addEventListener('click', () => {
    soundSwitch.classList.toggle('switch-off')
    playSound('button-sound')
  })
}

export function OnOffTime() {
  const timeSwitch = document.querySelector('.time-switch')

  timeSwitch.addEventListener('click', () => {
    timeSwitch.classList.toggle('switch-off')
    playSound('button-sound')
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

export function loadSettings() {}

export function saveSettings() {
  const values = {}
}

export function defaultSettings() {
  const time = document.querySelector('.time-input')
  const volumeInput = document.querySelector('.volume-input')

  time.value = 20
  volumeInput.volume = 0.3
  volumeInput.style.background = `linear-gradient(
    90deg,
    #14f500 0%,
    #14f500 30%,
    #ffffff 30%,
    #ffffff 100%
  )`
}
