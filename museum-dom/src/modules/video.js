export function videoProgress() {
  const progress = document.querySelectorAll('.progress')

  progress.forEach((item) => {
    item.addEventListener('input', function () {
      const value = this.value
      this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
    })
  })
}

export function videoSlider() {
  const videoLinks = [
    'https://www.youtube.com/embed/zp1BXPX8jcU?controls=1',
    'https://www.youtube.com/embed/Vi5D6FKhRmo?controls=1',
    'https://www.youtube.com/embed/NOhDysLnTvY?controls=1',
    'https://www.youtube.com/embed/aWmJ5DgyWPI?controls=1',
    'https://www.youtube.com/embed/2OR0OCr6uRE?controls=1',
  ]

  const left = document.querySelector('.video-arrow.left')
  const right = document.querySelector('.video-arrow.right')
  const current = document.querySelector('.video-bullet.current')
  const bullets = document.querySelectorAll('.video-bullet')
  const videos = document.querySelectorAll('.video-item')
  let sliderInner = document.querySelector('.video-slider-inner')

  let width = sliderInner.getAttribute('left')
  console.log(sliderInner)

  let v = 0
  videos.forEach((video) => {
    video.style.left = `${v * 34.33}%`
    v++
  })

  let currentSlide = 0
  let isAnimation = false

  function changeSlideNumber(direction) {
    if (direction === 'left') {
      if (currentSlide + 1 === videoLinks.length) {
        currentSlide = 0
      } else {
        currentSlide++
      }
    }
    if (direction === 'right') {
      if (currentSlide - 1 === -1) {
        currentSlide = videoLinks.length - 1
      } else {
        currentSlide--
      }
    }
  }

  function leftMove() {
    let videos = document.querySelectorAll('.video-item')
    let slider = document.querySelector('.video-slider-inner')

    let offsetTemp = 0

    videos.forEach((video) => {
      video.style.left = `${offsetTemp * 34.33 - 34.33}%`
      offsetTemp++
    })

    let temp = videos[0]
    temp.style.opacity = 0
    temp.style.left = `${offsetTemp * 34.33 - 34.33}%`

    setTimeout(() => {
      slider.append(temp)
      temp.style.opacity = 1
      isAnimation = false
    }, 1000)
  }

  function rightMove() {
    let videos = document.querySelectorAll('.video-item')
    let slider = document.querySelector('.video-slider-inner')

    let offsetTemp = 0

    videos.forEach((video) => {
      video.style.left = `${offsetTemp * 34.33 + 34.33}%`
      offsetTemp++
    })

    let temp = videos[videos.length - 1]
    temp.style.opacity = 0
    temp.style.left = `0%`

    slider.prepend(temp)

    setTimeout(() => {
      temp.style.opacity = 1
      isAnimation = false
    }, 1000)
  }

  function addCurrent() {
    bullets.forEach((bullet) => {
      bullet.classList.remove('current')
    })
    bullets[currentSlide].classList.add('current')
  }

  left.addEventListener('click', () => {
    if (!isAnimation) {
      isAnimation = true
      changeSlideNumber('left')
      addCurrent()
      leftMove()
    }
  })

  right.addEventListener('click', () => {
    if (!isAnimation) {
      isAnimation = true
      changeSlideNumber('right')
      addCurrent()
      rightMove()
    }
  })

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', () => {
      bullet.classList.toggle('current')
    })
  })
}
