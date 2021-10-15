import './styles/style.scss'

import { setTime, showGreeting, getTimeOfDay } from './modules/clock.js'
import { setName, checkName } from './modules/personal.js'
import { changeBackground } from './modules/slider.js'

setTimeout(function show() {
  setTime()
  setTimeout(show, 1000)
}, 1000 - new Date().getMilliseconds())

showGreeting()
changeBackground()

window.addEventListener('load', checkName)
window.addEventListener('beforeunload', setName)
