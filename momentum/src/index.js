import './styles/owfont-regular.css'
import './styles/style.scss'

import { setTime, showGreeting, getTimeOfDay } from './modules/clock.js'
import { setName, checkName } from './modules/personal.js'
import * as slider from './modules/slider.js'
import { getWeather } from './modules/weather.js'
import { getQuotes } from './modules/quotes.js'
import playList from './modules/playList.js'
import { addAudio, player } from './modules/player.js'

let randomNum = slider.getRandomNum()
let timeOfDay = getTimeOfDay()
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

const quoteBtn = document.querySelector('.change-quote')

setTimeout(function show() {
  setTime()
  setTimeout(show, 1000)
}, 1000 - new Date().getMilliseconds())

showGreeting(localStorage['appLanguage'] || 'en')
getWeather(localStorage['appLanguage'] || 'en')

slider.setBg(timeOfDay, randomNum)

window.addEventListener('load', checkName)
window.addEventListener('beforeunload', setName)

slideNext.addEventListener('click', () => {
  randomNum = slider.getNextSlide(randomNum)
  slider.setBg(timeOfDay, randomNum)
})
slidePrev.addEventListener('click', () => {
  randomNum = slider.getPrevSlide(randomNum)
  slider.setBg(timeOfDay, randomNum)
})

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
  getWeather(localStorage['appLanguage'] || 'en')
})
