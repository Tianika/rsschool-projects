import './styles/normalize.css'
import './styles/style.scss'

import images from './modules/images.js'
import Home from './modules/pages/Home.js'

// const routes = {
//   '/': Home,
//   '/settings': Settings,
//   '/categories': Category,
//   '/questions': Question,
// }

const home = new Home()
home.run()

const body = document.querySelector('body')

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('settings-button')) {
    console.log('settings')
  }
  if (event.target.classList.contains('button-artist')) {
    console.log('button-artist')
  }
  if (event.target.classList.contains('button-pictures')) {
    console.log('button-pictures')
  }
})
