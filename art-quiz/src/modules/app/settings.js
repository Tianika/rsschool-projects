const audio = new Audio()

export function changeVolume() {
  const volume = document.querySelector('.volume-input')

  volume.addEventListener('input', () => {
    let volumeLevel = volume.value
    console.log(volumeLevel)
    volume.style.background = changeBgInputVolume(volumeLevel)
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
  })
}

export function OnOffTime() {
  const timeSwitch = document.querySelector('.time-switch')

  timeSwitch.addEventListener('click', () => {
    timeSwitch.classList.toggle('switch-off')
  })
}
