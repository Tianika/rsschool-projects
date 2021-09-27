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
const ticketsForm = document.querySelector('.buy-tickets-container')

buyBtn.addEventListener('click', function () {
  ticketsForm.classList.remove('buy-tickets-hidden')
})

buyBtnClose.addEventListener('click', function () {
  ticketsForm.classList.add('buy-tickets-hidden')
})

//ripple
