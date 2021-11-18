import './styles/normalize.css'
import './styles/style.scss'

import images from './modules/app/images.js'
//import { handlers, classesForHandlers } from './modules/app/handlers'
import { randomNumber, changeBgImage } from './modules/app/general.js'
import Home from './modules/pages/Home.js'
import Settings from './modules/pages/Settings.js'
import Category from './modules/pages/Category.js'
import QuestionAboutArtist from './modules/pages/QuestionAboutArtist.js'
import Person from './modules/app/Person.js'
import { Game } from './modules/app/Game'

// const routes = {
//   '/': Home,
//   '/settings': Settings,
//   '/categories': Category,
//   '/questions': Question,
// }

const root = document.querySelector('.root')
let randomPictureNum = randomNumber(images.length)

changeBgImage(root, randomPictureNum)

const home = new Home()
const settings = new Settings()
const categoryArtist = new Category('Artist quiz')
const categoryPicture = new Category('Pictures quiz')

const person = new Person()

home.run()

if (!localStorage['resultsArtQuiz']) {
  const arr = new Array(24)

  localStorage['resultsArtQuiz'] = JSON.stringify(arr)
}

const body = document.querySelector('body')

body.addEventListener('click', (event) => {
  console.log(event.target)

  if (event.target.classList.contains('home-button')) {
    home.run()
    person.currentPage = 'home'
  }
  if (event.target.classList.contains('settings-button')) {
    settings.run()
  }
  if (event.target.classList.contains('button-artist')) {
    categoryArtist.run('artist')
    person.currentPage = 'artist'
  }
  if (event.target.classList.contains('button-pictures')) {
    categoryPicture.run('picture')
    person.currentPage = 'picture'
  }
  if (event.target.classList.contains('category-button')) {
    if (person.currentPage === 'artist') {
      categoryArtist.run('artist')
    }
    if (person.currentPage === 'picture') {
      categoryPicture.run('picture')
    }
  }
  if (event.target.classList.contains('next-quiz-button')) {
    console.log('next quiz')
    if (person.currentPage === 'artist') {
      categoryArtist.run('artist')
    }
    if (person.currentPage === 'picture') {
      categoryPicture.run('picture')
    }
  }
  if (event.target.classList.contains('timer-pictures')) {
    // добавить обработчик
  }
  if (event.target.classList.contains('card-image')) {
    let round = event.target.dataset.image
    console.log(round)
    let typeGame = person.currentPage === 'artist' ? 'artist' : 'picture'

    const game = new Game(round, typeGame)
    game.start()
  }
  if (event.target.classList.contains('card-score-button')) {
    // добавить обработчик
  }
})

window.addEventListener('hashchange', console.log('hash'))
window.addEventListener('load', console.log('load'))
