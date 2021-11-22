import { playSound } from './sound'
import AnswerWindow from '../components/AnswerWindow'
import { modalAnimation } from './general'

export class Timer {
  constructor(game) {
    this.interval = null
    this.game = game
    this.isEnable = true
  }

  timerOn() {
    const timerBtn = document.querySelector('.timer-button')

    let time = localStorage.roundDuration

    const showTime = () => {
      timerBtn.innerText = `00:${time.toString().padStart(2, '0')}`
      time--

      if (time === -1) {
        timerBtn.innerText = `Time's up`
        this.timerOff()

        if (this.isEnable) {
          playSound('error-answer')
          this.game.bullets[this.game.questionNumber] = 'error'

          const root = document.querySelector('.root')
          const answer = new AnswerWindow(this.game.question)
          root.innerHTML += answer.renderAnswer()
          const modalImage = document.querySelector('.modal-answer-image')
          modalImage.style.backgroundImage = `url('./assets/img/img/${this.game.question.imageNum}.jpg')`
          modalImage.classList.add('error-answer')
          this.game.roundResult.push('error')
          this.game.questionNumber++
          this.game.answers = []

          //анимация
          modalAnimation()

          this.game.listerNextBtn()
        }
      }
    }

    if (!this.interval) {
      this.interval = setInterval(showTime, 1000)
    }
  }

  timerOff() {
    clearInterval(this.interval)
    this.interval = null
  }
}
