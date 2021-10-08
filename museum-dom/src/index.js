import './styles/style.scss'

//video-player
const progress = document.querySelectorAll('.progress')

progress.forEach((item) => {
  item.addEventListener('input', function () {
    const value = this.value
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  })
})

//gallery
function randomImage() {
  const images = [
    './assets/img/galery/galery1.jpg',
    './assets/img/galery/galery2.jpg',
    './assets/img/galery/galery3.jpg',
    './assets/img/galery/galery4.jpg',
    './assets/img/galery/galery5.jpg',
    './assets/img/galery/galery6.jpg',
    './assets/img/galery/galery7.jpg',
    './assets/img/galery/galery8.jpg',
    './assets/img/galery/galery9.jpg',
    './assets/img/galery/galery10.jpg',
    './assets/img/galery/galery11.jpg',
    './assets/img/galery/galery12.jpg',
    './assets/img/galery/galery13.jpg',
    './assets/img/galery/galery14.jpg',
    './assets/img/galery/galery15.jpg',
  ]
  images.sort(() => Math.random() - 0.5)

  const pictureInnerContainer = document.querySelector(
    '.picture-inner-container'
  )
  images.forEach((image) => {
    const img = document.createElement('img')
    img.src = `${image}`
    img.alt = `galery image`
    pictureInnerContainer.append(img)
  })
}

randomImage()

//buy tickets
const buyBtn = document.querySelector('.button-buy')
const buyBtnClose = document.querySelector('.buy-ticket-close')
const ticketsForm = document.querySelector('.buy-tickets-overlay')

buyBtn.addEventListener('click', function () {
  ticketsForm.classList.remove('buy-tickets-hidden')
})

buyBtnClose.addEventListener('click', function () {
  ticketsForm.classList.add('buy-tickets-hidden')
})

ticketsForm.addEventListener('click', function (event) {
  if (event.target === ticketsForm) {
    ticketsForm.classList.add('buy-tickets-hidden')
  }
})

//burger
const burger = document.querySelector('.burger-icon')
const menuBurger = document.querySelector('.menu-burger')
const iconBurger = document.querySelector('.burger-icon')
const burgerLinks = document.querySelectorAll('.burger-link')
const welcomeTitle = document.querySelector('.welcome-title')
const welcomeSubtitle = document.querySelector('.welcome-subtitle')
const welcomeBtn = document.querySelector('.welcome-button')

burger.addEventListener('click', function () {
  menuBurger.classList.toggle('burger-hidden')
  iconBurger.classList.toggle('close')
  welcomeTitle.classList.toggle('opacity')
  welcomeSubtitle.classList.toggle('opacity')
  welcomeBtn.classList.toggle('opacity')
})

burgerLinks.forEach((link) => {
  link.addEventListener('click', function () {
    menuBurger.classList.toggle('burger-hidden')
    iconBurger.classList.toggle('close')
    welcomeTitle.classList.toggle('opacity')
    welcomeSubtitle.classList.toggle('opacity')
    welcomeBtn.classList.toggle('opacity')
  })
})

//welcome-slider
const welcomeSlides = [
  './assets/img/welcome-slider/1.jpg',
  './assets/img/welcome-slider/2.jpg',
  './assets/img/welcome-slider/3.jpg',
  './assets/img/welcome-slider/4.jpg',
  './assets/img/welcome-slider/5.jpg',
]

const left = document.querySelector('.slider-arrow.left')
const right = document.querySelector('.slider-arrow.right')
const current = document.querySelector('.slider-current')
const bullets = document.querySelectorAll('.index-square')
console.log(bullets)

let currentSlide = 0
let offset = 0
let isAnimation = false

function changeSlideNumber(direction) {
  console.log(currentSlide)
  if (direction === 'left') {
    if (currentSlide + 1 === welcomeSlides.length) {
      currentSlide = 0
    } else {
      currentSlide++
    }
    offset = 1
  }
  if (direction === 'right') {
    if (currentSlide - 1 === -1) {
      currentSlide = welcomeSlides.length - 1
    } else {
      currentSlide--
    }
    offset = -1
  }
}

function addImg() {
  const element = document.createElement('img')

  element.src = welcomeSlides[currentSlide]
  element.classList.add('slider-img')
  return element
}

function addNextSlide() {
  let slide = addImg()
  current.innerHTML = `0${currentSlide + 1}`

  const imgContainer = document.querySelector('.slider-img-container')
  slide.style.left = `${offset * 100}%`
  imgContainer.appendChild(slide)
}

function addPreviousSlide() {
  let slide = addImg()
  current.innerHTML = `0${currentSlide + 1}`

  const imgContainer = document.querySelector('.slider-img-container')
  slide.style.left = `${offset * 100}%`
  imgContainer.prepend(slide)
}

function leftMove() {
  let slidesTemp = document.querySelectorAll('.slider-img')
  let offsetTemp = 0

  slidesTemp.forEach((slide) => {
    slide.style.left = `${offsetTemp * 100 - 100}%`
    offsetTemp++
  })

  setTimeout(() => {
    slidesTemp[0].remove()
    isAnimation = false
  }, 1000)
}

function rightMove() {
  let slidesTemp = document.querySelectorAll('.slider-img')
  let offsetTemp = 0

  slidesTemp.forEach((slide) => {
    slide.style.left = `${offsetTemp * 100}%`
    offsetTemp++
  })

  setTimeout(() => {
    slidesTemp[slidesTemp.length - 1].remove()
    isAnimation = false
  }, 1000)
}

function addCurrent() {
  bullets.forEach((bullet) => {
    bullet.classList.remove('current')
  })
  bullets[currentSlide].classList.add('current')
}

addNextSlide()

right.addEventListener('click', (e) => {
  e.preventDefault()

  if (!isAnimation) {
    changeSlideNumber('left')
    addCurrent()
    console.log('left')
    addNextSlide()
    isAnimation = true

    setTimeout(() => {
      leftMove()
    }, 0)
  }
})

left.addEventListener('click', (e) => {
  e.preventDefault()

  if (!isAnimation) {
    changeSlideNumber('right')
    addCurrent()
    console.log('right')
    addPreviousSlide()
    isAnimation = true

    setTimeout(() => {
      rightMove()
    }, 0)
  }
})

console.log(bullets)

bullets.forEach((bullet) => {
  bullet.addEventListener('click', (e, index, bullets) => {
    e.preventDefault()
    console.log(e.target)

    i = e.target.index
    if (i < currentSlide) {
    }
    if (i > currentSlide) {
    }
    //currentSlide = e.target.index
  })
})

//explore

let sliderInput = document.querySelector('.slider input')
let sliderImage = document.querySelector('.original-image')

sliderInput.addEventListener('input', function () {
  sliderImage.style.width = this.value + '%'
})

//map
// mapboxgl.accessToken =
//   'pk.eyJ1IjoidGlhbmlrYSIsImEiOiJja3VnbmcycWUwdHRvMnZxZW9ibjAwM25mIn0.r_lAs0sJV68MyDoZQxd3wg'

// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/light-v10',
//   center: [2.3364, , 48.86091],
//   zoom: 10,
// })

// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.3333, 48.8602],
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'Greek hall',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.3397, 48.8607],
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'Royal Palace',
//       },
//     },
//   ],
// }
