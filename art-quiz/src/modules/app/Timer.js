import { playSound } from './sound'

export class Timer {
  constructor() {
    this.interval = null
  }

  timerOn() {
    const timerBtn = document.querySelector('.timer-button')

    let time = localStorage.roundDuration

    const showTime = () => {
      timerBtn.innerText = `00:${time.toString().padStart(2, '0')}`
      time--

      if (time === -1) {
        playSound('error-answer')

        clearInterval(this.interval)
        this.interval = null
      }
    }

    if (!this.interval) {
      this.interval = setInterval(showTime, 1000)
    }
  }

  timerOff() {
    console.log('stop')
    clearInterval(this.interval)
  }
}
