export function clockView() {
  let timeStr = document.querySelector('.time')
  let dateStr = document.querySelector('.date')

  function showTime(time, date) {
    timeStr.textContent = `${time}`
    dateStr.textContent = `${date}`
  }

  function setTime() {
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

  setTimeout(function show() {
    setTime()
    setTimeout(show, 1000)
  }, 1000 - new Date().getMilliseconds())
}
