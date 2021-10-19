import './styles/owfont-regular.css'
import './styles/style.scss'

import { setTime, showGreeting, getTimeOfDay } from './modules/clock.js'
import { setName, checkName } from './modules/personal.js'
import * as slider from './modules/slider.js'
import { getWeather } from './modules/weather.js'
import { getQuotes } from './modules/quotes.js'
import playList from './modules/playList.js'
import { addAudio, playAudio } from './modules/player.js'

let randomNum = slider.getRandomNum()
let timeOfDay = getTimeOfDay()
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

const quoteBtn = document.querySelector('.change-quote')

setTimeout(function show() {
  setTime()
  setTimeout(show, 1000)
}, 1000 - new Date().getMilliseconds())

showGreeting()

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

quoteBtn.addEventListener('click', getQuotes)

// async ??
addAudio(playList)

const tracks = document.querySelectorAll('.play-item')
const playBtn = document.querySelector('.play')
const prevAudioBtn = document.querySelector('.play-prev')
const nextAudioBtn = document.querySelector('.play-next')

let currentTrack = 0

playBtn.addEventListener('click', () => {
  playAudio(playList[currentTrack])
})

tracks.forEach((track, i, arr) => {
  track.addEventListener('click', () => {
    currentTrack = i
    playAudio(playList[currentTrack])
  })
})
