const timeStr = document.querySelector('.time')
const dateStr = document.querySelector('.date')
const welcome = document.querySelector('.greeting')

function showTime(time, date) {
  timeStr.textContent = `${time}`
  dateStr.textContent = `${date}`
}

export function setTime() {
  let now = new Date()
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }
  let time = now.toLocaleTimeString()
  let date = now.toLocaleDateString('en-GB', options)

  showTime(time, date)
}

export function showGreeting() {
  let date = new Date()
  let hours = date.getHours()

  let timeOfDay = getTimeOfDay(hours)
  welcome.innerText = `Good ${timeOfDay}`
}

export function getTimeOfDay(hours) {
  const TIMESOFDAY = ['night', 'morning', 'afternoon', 'evening']

  return TIMESOFDAY[Math.floor(hours / 6)]
}
