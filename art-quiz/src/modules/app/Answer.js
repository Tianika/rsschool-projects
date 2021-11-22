import { playSound } from './sound'
import AnswerWindow from '../components/AnswerWindow'
import { modalAnimation } from './general'

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
        this.game.listerNextBtn()
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

    //анимация
    modalAnimation()
  }
}
