function translateLinks(lang) {
  const linkTitle = document.querySelector('.link-title')
  const addBtn = document.querySelector('.add-link')
  const removeBtn = document.querySelector('.remove-link')

  if (lang === 'ru') {
    linkTitle.innerText = 'Ссылки:'
    addBtn.innerText = 'Добавить'
    removeBtn.innerText = 'Удалить'
  }
  if (lang === 'en') {
    linkTitle.innerText = 'Links:'
    addBtn.innerText = 'Add'
    removeBtn.innerText = 'Remove'
  }
}

function translateSettings(lang) {
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
    keywordsLabel.textContent = 'Ключевое слово для Flickr и Unsplash:'
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
    keywordsLabel.textContent = 'Keyword for Flickr and Unsplash:'
    audioLabel.textContent = 'Audio'
    weatherLabel.textContent = 'Weather'
    timeLabel.textContent = 'Time'
    dateLabel.textContent = 'Date'
    greetingLabel.textContent = 'Greeting'
    quotesLabel.textContent = 'Quotes'
    linksLabel.textContent = 'Links'
  }
}

export function translate(lang) {
  translateSettings(lang)
  translateLinks(lang)
}
