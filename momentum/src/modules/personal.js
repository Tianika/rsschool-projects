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
  }
}

export function translateSettings(lang) {
  const settingsTitle = document.querySelector('.settings-title')
  const keywordsLabel = document.querySelector('.label-keywords')
  const audioLabel = document.querySelector('.audio-on span')
  const weatherLabel = document.querySelector('.weather-on span')
  const timeLabel = document.querySelector('.time-on span')
  const dateLabel = document.querySelector('.date-on span')
  const greetingLabel = document.querySelector('.greeting-on span')
  const quotesLabel = document.querySelector('.quotes-on span')
  const linksLabel = document.querySelector('.links-on span')

  if (lang === 'ru') {
    settingsTitle.textContent = 'Настройки:'
    keywordsLabel.textContent = 'Ключевые слова для Flickr и Unsplash:'
    audioLabel.textContent = 'Аудио'
    weatherLabel.textContent = 'Погода'
    timeLabel.textContent = 'Время'
    dateLabel.textContent = 'Дата'
    greetingLabel.textContent = 'Приветствие'
    quotesLabel.textContent = 'Цитаты'
    linksLabel.textContent = 'Ссылки'
  }
  if (lang === 'en') {
    settingsTitle.textContent = 'Settings:'
    keywordsLabel.textContent = 'Кeywords for Flickr and Unsplash:'
    audioLabel.textContent = 'Audio'
    weatherLabel.textContent = 'Weather'
    timeLabel.textContent = 'Time'
    dateLabel.textContent = 'Date'
    greetingLabel.textContent = 'Greeting'
    quotesLabel.textContent = 'Quotes'
    linksLabel.textContent = 'Links'
  }
}
