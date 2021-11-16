import './styles/normalize.css'
import './styles/style.scss'

import images from './modules/images.js'
import { shuffle, randomNumber, changeBgImage } from './modules/general.js'
import Home from './modules/pages/Home.js'
import Settings from './modules/pages/Settings.js'
import Category from './modules/pages/Category.js'
import ArtistQuestion from './modules/pages/ArtistQuestion.js'
import Person from './modules/Person.js'

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
const artistQuestion = new ArtistQuestion()

const unicArtists = new Set()
images.map((image) => unicArtists.add(image.author))

const person = new Person()

home.run()

const body = document.querySelector('body')

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('home-button')) {
    home.run()
    person.currentPage
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
    // возврат к выбранной категории
  }
  if (event.target.classList.contains('timer-pictures')) {
    // добавить обработчик
  }
  if (event.target.classList.contains('card-image')) {
    artistQuestion.run()
  }
  if (event.target.classList.contains('card-score-button')) {
    //страница score
  }
})

window.addEventListener('hashchange', console.log('hash'))
window.addEventListener('load', console.log('load'))
