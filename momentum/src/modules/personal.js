const name = document.querySelector('.name')

export function setName() {
  localStorage['nameForMomentum'] = name.value
}

export function checkName() {
  let savedName = localStorage['nameForMomentum']

  name.value = savedName ? savedName : ''
}
