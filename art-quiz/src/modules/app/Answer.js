import { playSound } from './sound'
import AnswerWindow from '../components/AnswerWindow'
import GameOverWindow from '../pages/GameOverWindow'
import ResultWindow from '../pages/ResultWindow'
import GrandResultWindow from '../pages/GrandResultWindow'
import { Timer } from './Timer'

export class Answer {
  constructor(game) {
    this.game = game
  }

  listenAnswer(timer) {
    //слушаем клик
    this.game.answersContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('answer')) {
        //останавливаем таймер, если игра на время
        if (timer) {
          timer.timerOff()
          console.log(timer)
        }

        //добавляем стили для правильного-неправильного ответа
        if (event.target.dataset.right === 'right') {
          event.target.classList.add('right-answer')
          this.game.bullets[this.game.questionNumber] = 'right'
          this.game.score++
          playSound('right-answer')
        } else if (event.target.dataset.right === 'error') {
          event.target.classList.add('error-answer')
          this.game.bullets[this.game.questionNumber] = 'error'
          playSound('error-answer')
        }

        this.createAnswerWindow(event.target)

        const nextBtn = document.querySelector('.button-next')

        nextBtn.addEventListener('click', () => {
          playSound('button-sound')

          if (this.game.questionNumber === 10) {
            this.game.saveResults()

            if (document.querySelector('.modal-answer')) {
              document.querySelector('.modal-answer').remove()
            }

            const mainScreen = document.querySelector('.main-screen')

            if (this.game.score === 0) {
              const result = new GameOverWindow()
              mainScreen.insertAdjacentHTML('afterEnd', result.render())
              playSound('game-lost')
            } else if (this.game.score < 10) {
              const result = new ResultWindow()
              mainScreen.insertAdjacentHTML('afterEnd', result.render())
              const resultScore = document.querySelector('.modal-result-score')
              resultScore.innerHTML = this.game.score
              playSound('win-sound')
            } else if (this.game.score === 10) {
              const result = new GrandResultWindow()
              mainScreen.insertAdjacentHTML('afterEnd', result.render())
              playSound('grand-win')
            }
            console.log(this.game)
            return
          }
          this.game.run()
        })
      }
    })
  }

  createAnswerWindow(eventTarget) {
    //создаем окно ответа
    const root = document.querySelector('.root')

    const answer = new AnswerWindow(this.game.question)
    root.innerHTML += answer.renderAnswer()
    const modalImage = document.querySelector('.modal-answer-image')
    modalImage.style.backgroundImage = `url('./assets/img/img/${this.game.question.imageNum}.jpg')`

    if (eventTarget.dataset.right === 'right') {
      modalImage.classList.add('right-answer')
      this.game.roundResult.push('right')
    } else if (eventTarget.dataset.right === 'error') {
      modalImage.classList.add('error-answer')
      this.game.roundResult.push('error')
    }

    this.game.questionNumber++
    this.game.answers = []
  }
}
