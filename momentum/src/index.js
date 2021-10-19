import './styles/owfont-regular.css'
import './styles/style.scss'

import { setTime, showGreeting, getTimeOfDay } from './modules/clock.js'
import { setName, checkName } from './modules/personal.js'
import * as slider from './modules/slider.js'
import { getWeather } from './modules/weather.js'

let randomNum = slider.getRandomNum()
let timeOfDay = getTimeOfDay()
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

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
