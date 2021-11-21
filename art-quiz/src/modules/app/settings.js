export function changeVolumeBg() {
  const volume = document.querySelector('.volume-input')

  volume.addEventListener('change', () => {
    let volumeLevel = volume.value
    playSound('button-sound')
    changeVolume(volumeLevel)
    console.log(volumeLevel)
    volume.background = changeBgInputVolume(volumeLevel)
  })

  function changeBgInputVolume(value) {
    return `linear-gradient(
      90deg,
      $generalColor 0%,
      $generalColor ${value}%,
      $white ${value}%,
      $white 100%
    )`
  }
}

export function OnOffSound() {
  const soundSwitch = document.querySelector('.sound-switch')

  soundSwitch.addEventListener('click', () => {
    soundSwitch.classList.toggle('switch-off')
    playSound('button-sound')
    sound.muted
  })
}

export function OnOffTime() {
  const timeSwitch = document.querySelector('.time-switch')

  timeSwitch.addEventListener('click', () => {
    timeSwitch.classList.toggle('switch-off')
    playSound('button-sound')
  })
}
