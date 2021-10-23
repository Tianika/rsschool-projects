const name = document.querySelector('.name')

export function setName() {
  localStorage['nameForMomentum'] = name.value
}

export function checkName(lang) {
  let savedName = localStorage['nameForMomentum']

  name.value = savedName ? savedName : ''
  if (lang === 'en') {
    name.placeholder = 'enter name'
  }
  if (lang === 'ru') {
    name.placeholder = 'введите имя'
  }
}

export function changeDisplayBlock(input) {
  const player = document.querySelector('.player-container')
  const weather = document.querySelector('.weather')
  const time = document.querySelector('.time')
  const date = document.querySelector('.date')
  const greeting = document.querySelector('.greeting-container')
  const quotes = document.querySelector('.quotes-content')
  const quotesBtn = document.querySelector('.change-quote')
  const links = document.querySelector('.links-container')
  const linksIcon = document.querySelector('.links-icon')

  if (input.id === 'audio') {
    player.classList.toggle('invisible')
  }

  if (input.id === 'weather') {
    weather.classList.toggle('invisible')
  }

  if (input.id === 'time') {
    time.classList.toggle('invisible')
  }

  if (input.id === 'date') {
    date.classList.toggle('invisible')
  }
  if (input.id === 'greeting') {
    greeting.classList.toggle('invisible')
  }
  if (input.id === 'quotes') {
    quotes.classList.toggle('invisible')
    quotesBtn.classList.toggle('invisible')
  }
  if (input.id === 'links') {
    links.classList.toggle('invisible')
    linksIcon.classList.toggle('invisible')
  }
}
