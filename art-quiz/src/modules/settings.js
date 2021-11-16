const audio = new Audio()

export function changeVolume() {
  const volume = document.querySelector('#volume')

  volume.addEventListener('change', () => {
    let volumeLevel = volume.value
  })
}
