import images from './images'
import QuestionAboutArtist from '../pages/QuestionAboutArtist'
import { Bullet } from '../components/Bullet'
import { AnswerBtnForArtist } from '../components/AnswerBtnForArtist'
import AnswerWindow from '../components/AnswerWindow'
import ResultWindow from '../pages/ResultWindow'
import GrandResultWindow from '../pages/GrandResultWindow'
import { QuestionImage } from '../components/QuestionImage'
import { shuffle, randomNumber } from './general'

export class Game {
  constructor(round, typeGame) {
    this.questionNumber = 0
    this.round = round
    this.score = 0
    this.typeGame = typeGame
    this.beginSlice = round * 10 + this.questionNumber
    this.images = images.slice(this.beginSlice, this.beginSlice + 10)
    this.rounds = []
    this.answers = []
    this.bullets = ['', '', '', '', '', '', '', '', '', '']
  }

  start() {
    console.log('run')
    this.run()

    const root = document.querySelector('.root')

    root.addEventListener('click', (event) => {
      if (event.target.classList.contains('button-next')) {
        root.innerHTML = ''
        if (this.questionNumber === 10) {
          this.endRound()

          if (this.score === 10) {
            const result = new GrandResultWindow()
            root.innerHTML += result.render()
          } else {
            const result = new ResultWindow()
            root.innerHTML += result.render()
          }

          const resultScore = document.querySelector('.modal-result-score')
          resultScore.innerText = this.score
          return
        }
        this.run()
      }
    })
  }

  run() {
    const questionAboutArtist = new QuestionAboutArtist()
    if (this.typeGame === 'artist') {
      questionAboutArtist.run()
    }

    //добавляем буллеты
    this.addBullets()

    //добавляем картину
    this.question = this.images[this.questionNumber]
    const questionImage = new QuestionImage(this.question.imageNum)
    questionImage.renderQuestion()

    //добавляем ответы
    this.rightAnswer = this.question.author
    this.answers.push(this.rightAnswer)
    this.addAnswersToArtists()

    //слушаем клик
    const answersContainer = document.querySelector('.question-artist-answers')
    const root = document.querySelector('.root')

    answersContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('answer')) {
        //добавляем стили для правильного-неправильного ответа
        if (event.target.dataset.right === 'right') {
          event.target.classList.add('right-answer')
          this.bullets[this.questionNumber] = 'right'
          this.score++
        } else if (event.target.dataset.right === 'error') {
          event.target.classList.add('error-answer')
          this.bullets[this.questionNumber] = 'error'
        }

        //создаем окно ответа
        const answer = new AnswerWindow(this.question)
        root.innerHTML += answer.renderAnswer()
        const modalImage = document.querySelector('.modal-answer-image')
        modalImage.style.backgroundImage = `url('../assets/img/img/${this.question.imageNum}.jpg')`

        if (event.target.dataset.right === 'right') {
          modalImage.classList.add('right-answer')
        } else if (event.target.dataset.right === 'error') {
          modalImage.classList.add('error-answer')
        }

        this.questionNumber++
        this.answers = []
        console.log(this.bullets)
        console.log(this.questionNumber)
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

    while (this.answers.length < 4) {
      let author = images[randomNumber(images.length - 1)].author

      if (!this.answers.includes(author)) {
        this.answers.push(author)
      }
    }

    this.answers = shuffle(this.answers)
    this.answers.forEach((answer) => {
      container.innerHTML += new AnswerBtnForArtist(
        answer,
        this.rightAnswer
      ).renderAnswer()
    })
  }

  endRound() {
    const resultForSave = {}
    resultForSave['score'] = this.score
    resultForSave['hide'] = 'card-score'
    resultForSave['play'] = 'card-image'
    resultForSave['images'] = [...this.bullets]

    const arrayResults = JSON.parse(localStorage['resultsArtQuiz'])

    arrayResults[this.round] = resultForSave
    localStorage['resultsArtQuiz'] = JSON.stringify(arrayResults)
  }
}
