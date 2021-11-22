import './styles/normalize.css'
import './styles/style.scss'

import images from './modules/app/images.js'
import {
  randomNumber,
  changeBgImage,
  pageChangeAnimation,
} from './modules/app/general.js'
import {
  OnOffSound,
  OnOffTime,
  changeTime,
  defaultSettings,
  loadSettings,
} from './modules/app/settings.js'
import Home from './modules/pages/Home.js'
import Settings from './modules/pages/Settings.js'
import Category from './modules/pages/Category.js'
import Person from './modules/app/Person.js'
import Game from './modules/app/Game.js'
import Score from './modules/pages/Score.js'
import { playSound } from './modules/app/sound.js'

try {
  const root = document.querySelector('.root')
  const body = document.querySelector('body')
  const person = new Person()

  let randomPictureNum = randomNumber(images.length)
  changeBgImage(root, randomPictureNum)

  const home = new Home()
  home.run()

  if (!localStorage['timerOnOff']) {
    localStorage['timerOnOff'] = 'switch-off'
  }

  if (!localStorage['roundDuration']) {
    localStorage['roundDuration'] = 20
  }

  if (!localStorage['resultsArtQuiz']) {
    const arr = new Array(24)
    localStorage['resultsArtQuiz'] = JSON.stringify(arr)
  }

  body.addEventListener('click', (event) => {
    if (event.target.classList.contains('home-button')) {
      pageChangeAnimation(home)

      playSound('button-sound')
      person.currentPage = 'home'
    }

    if (event.target.classList.contains('settings-button')) {
      const settings = new Settings()
      pageChangeAnimation(settings)
      playSound('button-sound')

      setTimeout(() => {
        loadSettings()
        OnOffSound()
        OnOffTime()
        changeTime()
      }, 1000)
    }

    if (event.target.classList.contains('close-button')) {
      playSound('button-sound')

      if (person.currentPage === 'home') {
        pageChangeAnimation(home)
      }
      if (person.currentPage === 'artist' || person.currentPage === 'picture') {
        const category = new Category(person.currentPage)
        pageChangeAnimation(category)
      }
    }

    if (event.target.classList.contains('button-artist')) {
      playSound('button-sound')
      person.currentPage = 'artist'

      const category = new Category(person.currentPage)
      pageChangeAnimation(category)
    }

    if (event.target.classList.contains('button-pictures')) {
      playSound('button-sound')
      person.currentPage = 'picture'

      const category = new Category(person.currentPage)
      pageChangeAnimation(category)
    }

    if (event.target.classList.contains('category-button')) {
      playSound('button-sound')

      if (person.currentPage === 'artist' || person.currentPage === 'picture') {
        const category = new Category(person.currentPage)
        pageChangeAnimation(category)
      }
    }

    if (event.target.classList.contains('next-quiz-button')) {
      playSound('button-sound')

      if (person.currentPage === 'artist' || person.currentPage === 'picture') {
        const category = new Category(person.currentPage)
        pageChangeAnimation(category)
      }
    }

    if (event.target.classList.contains('card-image')) {
      let round = event.target.dataset.image
      let typeGame = person.currentPage === 'artist' ? 'artist' : 'picture'

      playSound('button-sound')

      const game = new Game(round, typeGame)
      pageChangeAnimation(game)
    }

    if (event.target.classList.contains('card-score-button')) {
      playSound('button-sound')

      const scorePage = new Score(event.target.dataset.card)
      pageChangeAnimation(scorePage)
    }

    if (event.target.classList.contains('card-score-image')) {
      playSound('button-sound')

      const scoreImages = document.querySelectorAll('.card-score-info')

      scoreImages.forEach((img) => {
        if (event.target.nextElementSibling !== img) {
          img.classList.remove('up')
        }
      })
      event.target.nextElementSibling.classList.toggle('up')
    }

    if (event.target.classList.contains('small-button')) {
      playSound('button-sound')
    }

    if (event.target.classList.contains('default-settings')) {
      playSound('button-sound')
      defaultSettings()
    }
  })

  console.log(`
  Стартовая страница и навигация +20
  Настройки +40
  - настройки сохранияют автоматически при изменении, есть сброс на значения по умолчанию
  Страница категорий +30
  Страница с вопросами +50
  Страница с результатами +50
  Плавная смена изображений +10
  Анимация +10
  - 2 вида анимации: для страниц и окна ответов
  Доп.функционал +5
  - разные уведомления по окончанию раунда в зависимости от результата
  - оформление
  - адаптив кнопок score под тач

  `)
} catch (err) {
  console.log('Error:', err)
}
