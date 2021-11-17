import images from './images'
import { Bullet } from '../components/Bullet'
import { AnswerBtnForArtist } from '../components/AnswerBtnForArtist'
import AnswerWindow from '../components/AnswerWindow'
import { QuestionImage } from '../components/QuestionImage'
import { shuffle, randomNumber } from './general'

export class Game {
  constructor(round) {
    this.questionNumber = 0
    this.round = round
    this.beginSlice = round * 10 + this.questionNumber
    this.images = images.slice(this.beginSlice, this.beginSlice + 10)
    this.rounds = []
    this.answers = new Set()
    this.bullets = ['', '', '', '', '', '', '', '', '', '']
  }

  start() {
    this.run()
  }

  run() {
    console.log('run')
    console.log(this.images)
    //добавляем буллеты
    this.addBullets()

    //добавляем картину
    this.question = this.images[this.questionNumber]
    const questionImage = new QuestionImage(this.question.imageNum)
    questionImage.renderQuestion()

    //добавляем ответы
    this.rightAnswer = this.question.author
    this.answers.add(this.rightAnswer)
    this.addAnswersToArtists()

    //слушаем клик
    const answersContainer = document.querySelector('.question-artist-answers')

    answersContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('answer')) {
        //создаем окно ответа
        const answer = new AnswerWindow(this.question)
        answer.renderAnswer()
        answersContainer.innerHTML += answer.renderAnswer()

        //добавляем стили для правильного-неправильного ответа
        const modalImage = document.querySelector('.modal-answer-image')

        console.log(event.target.classList)

        if (event.target.dataset.right === 'right') {
          event.target.classList.add('right-answer')
          modalImage.classList.add('right-answer')
          this.bullets[this.questionNumber] = 'right'
        } else if (event.target.dataset.right === 'error') {
          event.target.classList.add('error-answer')
          modalImage.classList.add('error-answer')
          this.bullets[this.questionNumber] = 'error'
        }

        modalImage.backgroundImage = `url('../assets/img/img/${this.question.imageNum}.jpg')`
        this.questionNumber++
        console.log(this.bullets)
      }
    })
  }

  addBullets() {
    const container = document.querySelector('.bullet-container')

    for (let i = 0; i < 10; i++) {
      const bullet = new Bullet(this.bullets[i])

      container.innerHTML += bullet.renderBullet()
    }
  }

  addAnswersToArtists() {
    const container = document.querySelector('.question-artist-answers')

    while (this.answers.size < 4) {
      this.answers.add(images[randomNumber(images.length)].author)
    }

    this.answers = shuffle([...this.answers])
    this.answers.forEach((answer) => {
      container.innerHTML += new AnswerBtnForArtist(
        answer,
        this.rightAnswer
      ).renderAnswer()
    })
  }
}
