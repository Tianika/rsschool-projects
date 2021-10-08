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

  const videoOrder = []

  const left = document.querySelector('.video-arrow.left')
  const right = document.querySelector('.video-arrow.right')
  const current = document.querySelector('.video-bullet.current')
  const bullets = document.querySelectorAll('.video-bullet')
  //const videos = document.querySelectorAll('.video-item')

  let currentSlide = 0
  let offset = 0
  let isAnimation = false

  function changeSlideNumber(direction) {
    if (direction === 'left') {
      if (currentSlide + 1 === videoLinks.length) {
        currentSlide = 0
      } else {
        currentSlide++
      }
      offset = 1
    }
    if (direction === 'right') {
      if (currentSlide - 1 === -1) {
        currentSlide = videoLinks.length - 1
      } else {
        currentSlide--
      }
      offset = -1
    }
  }

  function swapeLeft(video, i) {
    video.style.transform = `translateX${i * 100}%`
  }

  function swapeRight(video, i) {
    video.style.left = `translateX${i * 100}%`
  }

  function swape(direction) {
    if (direction === 'left') {
      const videos = document.querySelectorAll('.video-item')
      videos.forEach((video, index) => {
        console.log(video, index)
        swapeLeft(video, index)
      })
    }
    if (direction === 'right') {
      const videos = document.querySelectorAll('.video-item')
      videos.forEach((video, index) => {
        console.log(video, index)
        swapeRight(video, index)
      })
    }
  }

  left.addEventListener('click', () => {
    console.log('left')
    swape('left')
  })

  right.addEventListener('click', () => {
    console.log('right')
    swape('right')
  })
}
