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
import { playSound } from './modules/app/sound.js'

try {
  const root = document.querySelector('.root')

  let randomPictureNum = randomNumber(images.length)

  changeBgImage(root, randomPictureNum)

  const home = new Home()

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
      playSound('button-sound')
      person.currentPage = 'home'
    }

    if (event.target.classList.contains('settings-button')) {
      const settings = new Settings()
      settings.run()
      changeVolume()
      OnOffSound()
      OnOffTime()
      playSound('button-sound')
    }

    if (event.target.classList.contains('close-button')) {
      playSound('button-sound')

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
      playSound('button-sound')
      categoryArtist.run('artist')
      person.currentPage = 'artist'
    }

    if (event.target.classList.contains('button-pictures')) {
      playSound('button-sound')
      categoryPicture.run('picture')
      person.currentPage = 'picture'
    }

    if (event.target.classList.contains('category-button')) {
      playSound('button-sound')

      if (person.currentPage === 'artist') {
        categoryArtist.run('artist')
      }
      if (person.currentPage === 'picture') {
        categoryPicture.run('picture')
      }
    }

    if (event.target.classList.contains('next-quiz-button')) {
      playSound('button-sound')

      if (person.currentPage === 'artist') {
        categoryArtist.run('artist')
      }
      if (person.currentPage === 'picture') {
        categoryPicture.run('picture')
      }
    }

    if (event.target.classList.contains('timer-pictures')) {
      playSound('button-sound')
      // добавить обработчик
    }

    if (event.target.classList.contains('card-image')) {
      let round = event.target.dataset.image
      let typeGame = person.currentPage === 'artist' ? 'artist' : 'picture'

      const game = new Game(round, typeGame)
      playSound('button-sound')
      game.start()
    }

    if (event.target.classList.contains('card-score-button')) {
      const scorePage = new Score(event.target.dataset.card)
      playSound('button-sound')
      scorePage.createPage()
    }

    if (event.target.classList.contains('card-score-image')) {
      const scoreImages = document.querySelectorAll('.card-score-info')
      playSound('button-sound')

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
    }

    if (event.target.classList.contains('save-settings')) {
      playSound('button-sound')
    }
  })

  window.addEventListener('hashchange', console.log('hash'))
  window.addEventListener('load', console.log('load'))
} catch (err) {
  console.log('Error:', err)
}
