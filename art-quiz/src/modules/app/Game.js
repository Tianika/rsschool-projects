import images from './images'
import QuestionAboutArtist from '../pages/QuestionAboutArtist'
import QuestionAboutPicture from '../pages/QuestionAboutPicture'
import { Bullet } from '../components/Bullet'
import { AnswerBtnForArtist } from '../components/AnswerBtnForArtist'
import AnswerImages from '../components/AnswerImages'
import GameOverWindow from '../pages/GameOverWindow'
import ResultWindow from '../pages/ResultWindow'
import GrandResultWindow from '../pages/GrandResultWindow'
import { QuestionImage } from '../components/QuestionImage'
import { shuffle, randomNumber } from './general'
import { playSound } from './sound'
import { Timer } from './Timer'
import { Answer } from './Answer'
import { pageChangeAnimation } from './general'

export class Game {
  constructor(round, typeGame) {
    this.questionNumber = 0
    this.score = 0
    this.roundResult = []
    this.answers = []
    this.bullets = ['', '', '', '', '', '', '', '', '', '']
    this.round = round
    this.typeGame = typeGame
    this.beginSlice = round * 10 + this.questionNumber
    this.images = images.slice(this.beginSlice, this.beginSlice + 10)
    this.pauseGame = 2
    this.time = localStorage.roundDuration
  }

  run() {
    this.runRound()
  }

  runRound() {
    // ---------- artist quiz
    if (this.typeGame === 'artist') {
      const questionAboutArtist = new QuestionAboutArtist()
      questionAboutArtist.run()

      //добавляем картину
      this.question = this.images[this.questionNumber]
      const questionImage = new QuestionImage(this.question.imageNum)
      questionImage.renderQuestion()

      //добавляем ответы
      this.rightAnswer = this.question.author
      this.answers.push(this.rightAnswer)
      this.addAnswersToArtists()

      this.answersContainer = document.querySelector('.question-artist-answers')
    }

    // -------------picture quiz
    if (this.typeGame === 'picture') {
      const questionAboutPicture = new QuestionAboutPicture()
      questionAboutPicture.run()

      this.question = this.images[this.questionNumber]
      this.rightAnswer = this.question.author
      document.querySelector('.question-author').innerText = this.rightAnswer

      // добавляем 4 картины для ответов
      this.answers.push([this.rightAnswer, this.question.imageNum])
      this.addAnswersToPictures()

      this.answersContainer = document.querySelector(
        '.question-picture-answers'
      )
    }

    // ------------общее
    //добавляем буллеты
    this.addBullets()

    //таймер выключен
    if (localStorage.timerOnOff === 'switch-off') {
      const timerBtn = document.querySelector('.timer-button')
      timerBtn.style.display = 'none'

      const answer = new Answer(this)
      answer.listenAnswer()
    }

    //таймер включен
    if (localStorage.timerOnOff === ' ') {
      const timer = new Timer(this)
      timer.timerOn()

      //слушаем кнопки, прерывающие игру
      const homeBtn = document.querySelector('.home-button')
      const categoryBtn = document.querySelector('.category-button')
      const settingsBtn = document.querySelector('.settings-button')

      homeBtn.addEventListener('click', () => {
        timer.isEnable = false
      })
      categoryBtn.addEventListener('click', () => {
        timer.isEnable = false
      })
      settingsBtn.addEventListener('click', () => {
        timer.isEnable = false
      })

      //слушаем ответ
      const answer = new Answer(this)
      answer.listenAnswer(timer)
    }
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

  addAnswersToPictures() {
    while (this.answers.length < 4) {
      let image = images[randomNumber(images.length - 1)]

      if (this.answers[0][0] !== image.author) {
        this.answers.push([image.author, image.imageNum])
      }
    }

    this.answers = shuffle(this.answers)

    this.answers.forEach((answer, i, arr) => {
      new AnswerImages(answer[0], this.rightAnswer).renderAnswer(i, answer[1])
    })
  }

  listerNextBtn() {
    const nextBtn = document.querySelector('.button-next')

    nextBtn.addEventListener('click', () => {
      playSound('button-sound')

      if (this.questionNumber === 10) {
        this.saveResults()

        if (document.querySelector('.modal-answer')) {
          document.querySelector('.modal-answer').remove()
        }

        const mainScreen = document.querySelector('.main-screen')

        if (this.score === 0) {
          const result = new GameOverWindow()
          mainScreen.insertAdjacentHTML('afterEnd', result.render())
          playSound('game-lost')
        } else if (this.score < 10) {
          const result = new ResultWindow()
          mainScreen.insertAdjacentHTML('afterEnd', result.render())
          const resultScore = document.querySelector('.modal-result-score')
          resultScore.innerHTML = this.score
          playSound('win-sound')
        } else if (this.score === 10) {
          const result = new GrandResultWindow()
          mainScreen.insertAdjacentHTML('afterEnd', result.render())
          playSound('grand-win')
        }

        return
      }
      this.runRound()
    })
  }

  saveResults() {
    const resultForSave = {}
    resultForSave['score'] = this.score
    resultForSave['hide'] = 'card-score'
    resultForSave['play'] = 'play'
    resultForSave['images'] = [...this.bullets]
    resultForSave['roundResult'] = [...this.roundResult]

    const arrayResults = JSON.parse(localStorage['resultsArtQuiz'])

    arrayResults[this.round] = resultForSave
    localStorage['resultsArtQuiz'] = JSON.stringify(arrayResults)
  }
}

export default Game
