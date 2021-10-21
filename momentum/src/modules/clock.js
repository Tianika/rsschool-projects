export function setTime() {
  const timeStr = document.querySelector('.time')
  const dateStr = document.querySelector('.date')

  let now = new Date()
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  let time = now.toLocaleTimeString()
  let date = now.toLocaleDateString('en-GB', options)

  timeStr.textContent = `${time}`
  dateStr.textContent = `${date}`
}

export function showGreeting(lang) {
  const welcome = document.querySelector('.greeting')

  let timeOfDay = getTimeOfDay()

  if (lang === 'ru') {
    if (timeOfDay === 'night') {
      welcome.innerText = `Доброй ночи,`
    }
    if (timeOfDay === 'morning') {
      welcome.innerText = `Доброе утро,`
    }
    if (timeOfDay === 'afternoon') {
      welcome.innerText = `Добрый день,`
    }
    if (timeOfDay === 'evening') {
      welcome.innerText = `Добрый вечер,`
    }
  } else {
    welcome.innerText = `Good ${timeOfDay},`
  }
}

export function getTimeOfDay() {
  const TIMESOFDAY = ['night', 'morning', 'afternoon', 'evening']

  return TIMESOFDAY[Math.floor(new Date().getHours() / 6)]
}
