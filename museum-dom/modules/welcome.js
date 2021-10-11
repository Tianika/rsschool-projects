export function welcomeSlider() {
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
}
