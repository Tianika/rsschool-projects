import './styles/owfont-regular.css'
import './styles/style.scss'

import { setTime, showGreeting, getTimeOfDay } from './modules/clock.js'
import {
  setName,
  checkName,
  changeDisplayBlock,
  getSettings,
  saveSettings,
} from './modules/personal.js'
import * as slider from './modules/slider.js'
//import { getWeather } from './modules/weather.js'
import { getQuotes } from './modules/quotes.js'
import playList from './modules/playList.js'
import { addAudio, player } from './modules/player.js'
import { addLinksToPage } from './modules/links.js'
import { translate } from './modules/translate.js'

let randomNum = slider.getRandomNum()
let timeOfDay = getTimeOfDay()

const quoteBtn = document.querySelector('.change-quote')

//set start values
setTimeout(function show() {
  setTime(localStorage['appLanguage'] || 'en')
  showGreeting(localStorage['appLanguage'] || 'en')
  setTimeout(show, 1000)
}, 1000 - new Date().getMilliseconds())

window.addEventListener('load', () => {
  checkName(localStorage['appLanguage'] || 'en')
  setTime(localStorage['appLanguage'] || 'en')
  showGreeting(localStorage['appLanguage'] || 'en')
  //getWeather(localStorage['appLanguage'] || 'en')
  translate(localStorage['appLanguage'] || 'en')
  slider.setBg(timeOfDay, randomNum)
  getSettings()
})
window.addEventListener('beforeunload', () => {
  setName()
  saveSettings()
})

//slider
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

slideNext.addEventListener('click', () => {
  randomNum = slider.getNextSlide(randomNum)
  slider.setBg(timeOfDay, randomNum)
})
slidePrev.addEventListener('click', () => {
  randomNum = slider.getPrevSlide(randomNum)
  slider.setBg(timeOfDay, randomNum)
})

//images

const sourcesImg = document.querySelectorAll('.image-input')

sourcesImg.forEach((source) => {
  source.addEventListener('click', () => {
    slider.setBg(timeOfDay, randomNum)
  })
})

//quotes
getQuotes(localStorage['appLanguage'] || 'en')

quoteBtn.addEventListener('click', () => {
  getQuotes(localStorage['appLanguage'] || 'en')
})

// player
addAudio(playList)
player(playList)

//languages
const switchLang = document.querySelector('.switch-en')
const langs = document.querySelectorAll('.lang')

if (localStorage['appLanguage'] === 'ru') {
  switchLang.classList.toggle('switch-ru')
  switchLang.dataset.value = 'ru'

  langs.forEach((lang) => {
    lang.classList.toggle('on')
    lang.classList.toggle('off')
  })
}

switchLang.addEventListener('click', () => {
  switchLang.classList.toggle('switch-ru')

  if (switchLang.dataset.value === 'en') {
    switchLang.dataset.value = 'ru'
  } else {
    switchLang.dataset.value = 'en'
  }

  langs.forEach((lang) => {
    lang.classList.toggle('on')
    lang.classList.toggle('off')
  })

  localStorage['appLanguage'] = switchLang.dataset.value

  showGreeting(localStorage['appLanguage'] || 'en')
  getQuotes(localStorage['appLanguage'] || 'en')
  // getWeather(localStorage['appLanguage'] || 'en')
  checkName(localStorage['appLanguage'] || 'en')
  translate(localStorage['appLanguage'] || 'en')
})

//settings

const settings = document.querySelector('.settings')
const settingsBtn = document.querySelector('.setting-icon')
const settingsInputs = document.querySelectorAll('.view-input')

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('up')
})

settingsInputs.forEach((input) => {
  input.addEventListener('change', () => {
    changeDisplayBlock(input)
  })
})

//links
const linkBtn = document.querySelector('.links-icon')
const links = document.querySelector('.links-container')

addLinksToPage()

linkBtn.addEventListener('click', () => {
  links.classList.toggle('up')
})
