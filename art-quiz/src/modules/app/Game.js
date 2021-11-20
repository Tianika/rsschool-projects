import images from './images'
import QuestionAboutArtist from '../pages/QuestionAboutArtist'
import QuestionAboutPicture from '../pages/QuestionAboutPicture'
import { Bullet } from '../components/Bullet'
import { AnswerBtnForArtist } from '../components/AnswerBtnForArtist'
import AnswerImages from '../components/AnswerImages'
import AnswerWindow from '../components/AnswerWindow'
import ResultWindow from '../pages/ResultWindow'
import GrandResultWindow from '../pages/GrandResultWindow'
import { QuestionImage } from '../components/QuestionImage'
import { shuffle, randomNumber } from './general'
import Sound from './Sound'

export class Game {
  constructor(round, typeGame) {
    this.questionNumber = 0
    this.round = round
    this.score = 0
    this.typeGame = typeGame
    this.beginSlice = round * 10 + this.questionNumber
    this.images = images.slice(this.beginSlice, this.beginSlice + 10)
    this.roundResult = []
    this.answers = []
    this.bullets = ['', '', '', '', '', '', '', '', '', '']
  }

  start() {
    console.log('run')
    this.sound = new Sound()

    this.run()

    const root = document.querySelector('.root')

    root.addEventListener('click', (event) => {
      if (event.target.classList.contains('button-next')) {
        this.sound.playSound('button-sound')

        if (this.questionNumber === 10) {
          this.saveResults()

          if (document.querySelector('.modal-answer')) {
            document.querySelector('.modal-answer').remove()
          }

          if (this.score < 10) {
            const result = new ResultWindow()
            root.innerHTML += result.render()
            this.sound.playSound('win-sound')
          } else if (this.score === 10) {
            const result = new GrandResultWindow()
            root.innerHTML += result.render()
            this.sound.playSound('grand-win')
          }

          // if (this.score === 0) {
          //   //добавить окно для результата 0 баллов
          //   const result = 'Try again'
          //   root.innerHTML += result
          // } else

          const resultScore = document.querySelector('.modal-result-score')
          resultScore.innerHTML = this.score

          delete this.sound
          return
        }
        this.run()
      }
    })
  }

  run() {
    let answersContainer = ''

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

      answersContainer = document.querySelector('.question-artist-answers')
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
      console.log(this.answers)

      answersContainer = document.querySelector('.question-picture-answers')
    }

    // ------------общее
    //добавляем буллеты
    this.addBullets()

    //слушаем клик
    const root = document.querySelector('.root')

    answersContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('answer')) {
        //добавляем стили для правильного-неправильного ответа
        if (event.target.dataset.right === 'right') {
          event.target.classList.add('right-answer')
          this.bullets[this.questionNumber] = 'right'
          this.score++
          this.sound.playSound('right-answer')
          console.log(this.score)
        } else if (event.target.dataset.right === 'error') {
          event.target.classList.add('error-answer')
          this.bullets[this.questionNumber] = 'error'
          this.sound.playSound('error-answer')
        }

        //создаем окно ответа
        const answer = new AnswerWindow(this.question)
        root.innerHTML += answer.renderAnswer()
        const modalImage = document.querySelector('.modal-answer-image')
        modalImage.style.backgroundImage = `url('../assets/img/img/${this.question.imageNum}.jpg')`

        if (event.target.dataset.right === 'right') {
          modalImage.classList.add('right-answer')
          this.roundResult.push('right')
        } else if (event.target.dataset.right === 'error') {
          modalImage.classList.add('error-answer')
          this.roundResult.push('error')
        }

        this.questionNumber++
        this.answers = []
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
