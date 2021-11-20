import './styles/normalize.css'
import './styles/style.scss'

import images from './modules/app/images.js'
import { randomNumber, changeBgImage } from './modules/app/general.js'
import { changeVolume, OnOffSound, OnOffTime } from './modules/app/settings.js'
import Home from './modules/pages/Home.js'
import Settings from './modules/pages/Settings.js'
import Category from './modules/pages/Category.js'
import Person from './modules/app/Person.js'
import Game from './modules/app/Game.js'
import Score from './modules/pages/Score.js'
import Sound from './modules/app/Sound.js'

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

const sound = new Sound()

if (!localStorage['resultsArtQuiz']) {
  const arr = new Array(24)

  localStorage['resultsArtQuiz'] = JSON.stringify(arr)
}

const body = document.querySelector('body')

body.addEventListener('click', (event) => {
  console.log(event.target)

  if (event.target.classList.contains('home-button')) {
    home.run()
    sound.playSound('button-sound')
    person.currentPage = 'home'
  }

  if (event.target.classList.contains('settings-button')) {
    settings.run()
    changeVolume()
    OnOffSound()
    OnOffTime()
    sound.playSound('button-sound')
  }

  if (event.target.classList.contains('close-button')) {
    sound.playSound('button-sound')

    if (person.currentPage === 'home') {
      home.run()
    }
    if (person.currentPage === 'artist') {
      categoryArtist.run('artist')
    }
    if (person.currentPage === 'picture') {
      categoryPicture.run('picture')
    }
  }

  if (event.target.classList.contains('button-artist')) {
    sound.playSound('button-sound')
    categoryArtist.run('artist')
    person.currentPage = 'artist'
  }

  if (event.target.classList.contains('button-pictures')) {
    sound.playSound('button-sound')
    categoryPicture.run('picture')
    person.currentPage = 'picture'
  }

  if (event.target.classList.contains('category-button')) {
    sound.playSound('button-sound')

    if (person.currentPage === 'artist') {
      categoryArtist.run('artist')
    }
    if (person.currentPage === 'picture') {
      categoryPicture.run('picture')
    }
  }

  if (event.target.classList.contains('next-quiz-button')) {
    sound.playSound('button-sound')

    if (person.currentPage === 'artist') {
      categoryArtist.run('artist')
    }
    if (person.currentPage === 'picture') {
      categoryPicture.run('picture')
    }
  }

  if (event.target.classList.contains('timer-pictures')) {
    sound.playSound('button-sound')
    // добавить обработчик
  }

  if (event.target.classList.contains('card-image')) {
    let round = event.target.dataset.image
    let typeGame = person.currentPage === 'artist' ? 'artist' : 'picture'

    const game = new Game(round, typeGame)
    sound.playSound('button-sound')
    game.start()
  }

  if (event.target.classList.contains('card-score-button')) {
    const scorePage = new Score(event.target.dataset.card)
    sound.playSound('button-sound')
    scorePage.createPage()
  }

  if (event.target.classList.contains('card-score-image')) {
    const scoreImages = document.querySelectorAll('.card-score-info')
    sound.playSound('button-sound')

    scoreImages.forEach((img) => {
      if (event.target.nextElementSibling !== img) {
        img.classList.remove('up')
      }
    })
    event.target.nextElementSibling.classList.toggle('up')
  }
})

window.addEventListener('hashchange', console.log('hash'))
window.addEventListener('load', console.log('load'))
