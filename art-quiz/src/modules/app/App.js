import images from './images'
import { randomNumber, changeBgImage, pageChangeAnimation } from './general'
import {
  OnOffSound,
  OnOffTime,
  changeTime,
  defaultSettings,
  loadSettings,
} from './settings.js'
import { Home, Settings, Category, Score } from '../pages'
import Person from './Person.js'
import Game from './Game.js'
import { playSound } from './sound.js'
import {
  TIMER_ON_OFF,
  DEFAULT_ROUND_DURATION,
  BUTTONS,
  SOUNDS,
  PAGES,
} from '../../utils/constants'

export class App {
  start() {
    try {
      const root = document.querySelector('.root')
      const body = document.querySelector('body')
      const person = new Person()

      const randomPictureNum = randomNumber(images.length)
      changeBgImage(root, randomPictureNum)

      const home = new Home()
      home.run()

      if (!localStorage['timerOnOff']) {
        localStorage['timerOnOff'] = TIMER_ON_OFF.off
      }

      if (!localStorage['roundDuration']) {
        localStorage['roundDuration'] = DEFAULT_ROUND_DURATION
      }

      if (!localStorage['resultsArtQuiz']) {
        const arr = new Array(24)
        localStorage['resultsArtQuiz'] = JSON.stringify(arr)
      }

      body.addEventListener('click', (event) => {
        if (event.target.classList.contains(BUTTONS.homeBtn)) {
          pageChangeAnimation(home)

          playSound(SOUNDS.soundBtn)
          person.currentPage = PAGES.home
        }

        if (event.target.classList.contains(BUTTONS.settingsBtn)) {
          const settings = new Settings()
          pageChangeAnimation(settings)
          playSound(SOUNDS.soundBtn)

          setTimeout(() => {
            loadSettings()
            OnOffSound()
            OnOffTime()
            changeTime()
          }, 1000)
        }

        if (event.target.classList.contains(BUTTONS.closeBtn)) {
          playSound(SOUNDS.soundBtn)

          if (person.currentPage === PAGES.home) {
            pageChangeAnimation(home)
          }
          if (
            person.currentPage === PAGES.artist ||
            person.currentPage === PAGES.picture
          ) {
            const category = new Category(person.currentPage)
            pageChangeAnimation(category)
          }
        }

        if (event.target.classList.contains(BUTTONS.artistBtn)) {
          playSound(SOUNDS.soundBtn)
          person.currentPage = PAGES.artist

          const category = new Category(person.currentPage)
          pageChangeAnimation(category)
        }

        if (event.target.classList.contains(BUTTONS.picturesBtn)) {
          playSound(SOUNDS.soundBtn)
          person.currentPage = PAGES.picture

          const category = new Category(person.currentPage)
          pageChangeAnimation(category)
        }

        if (event.target.classList.contains(BUTTONS.categoryBtn)) {
          playSound(SOUNDS.soundBtn)

          if (
            person.currentPage === PAGES.artist ||
            person.currentPage === PAGES.picture
          ) {
            const category = new Category(person.currentPage)
            pageChangeAnimation(category)
          }
        }

        if (event.target.classList.contains(BUTTONS.nextQuizBtn)) {
          playSound(SOUNDS.soundBtn)

          if (
            person.currentPage === PAGES.artist ||
            person.currentPage === PAGES.picture
          ) {
            const category = new Category(person.currentPage)
            pageChangeAnimation(category)
          }
        }

        if (event.target.classList.contains(BUTTONS.cardImage)) {
          let round = event.target.dataset.image
          let typeGame =
            person.currentPage === PAGES.artist ? PAGES.artist : PAGES.picture

          playSound(SOUNDS.soundBtn)

          const game = new Game(round, typeGame)
          pageChangeAnimation(game)
        }

        if (event.target.classList.contains(BUTTONS.cardScoreBtn)) {
          playSound(SOUNDS.soundBtn)

          const scorePage = new Score(event.target.dataset.card)
          pageChangeAnimation(scorePage)
        }

        if (event.target.classList.contains(BUTTONS.cardScoreImg)) {
          playSound(SOUNDS.soundBtn)

          const scoreImages = document.querySelectorAll('.card-score-info')

          scoreImages.forEach((img) => {
            if (event.target.nextElementSibling !== img) {
              img.classList.remove('up')
            }
          })
          event.target.nextElementSibling.classList.toggle('up')
        }

        if (event.target.classList.contains(BUTTONS.smallBtn)) {
          playSound(SOUNDS.soundBtn)
        }

        if (event.target.classList.contains(BUTTONS.defaultBtn)) {
          playSound(SOUNDS.soundBtn)
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
      console.error('Error:', err)
    }
  }
}
export default App
