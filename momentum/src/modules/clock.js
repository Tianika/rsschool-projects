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

export function showGreeting() {
  const welcome = document.querySelector('.greeting')

  let timeOfDay = getTimeOfDay()
  welcome.innerText = `Good ${timeOfDay}`
}

export function getTimeOfDay() {
  const TIMESOFDAY = ['night', 'morning', 'afternoon', 'evening']

  return TIMESOFDAY[Math.floor(new Date().getHours() / 6)]
}
