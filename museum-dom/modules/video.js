export function videoSlider() {
  const videoLinks = [
    './assets/video/video0.mp4',
    './assets/video/video1.mp4',
    './assets/video/video2.mp4',
    './assets/video/video3.mp4',
    './assets/video/video4.mp4',
  ]

  const posters = [
    './assets/video/poster0.jpg',
    './assets/video/poster1.jpg',
    './assets/video/poster2.jpg',
    './assets/video/poster3.jpg',
    './assets/video/poster4.jpg',
  ]

  const left = document.querySelector('.video-arrow.left')
  const right = document.querySelector('.video-arrow.right')
  //const current = document.querySelector('.video-bullet.current')
  const bullets = document.querySelectorAll('.video-bullet')
  const videos = document.querySelectorAll('.video-item')
  let sliderInner = document.querySelector('.video-slider-inner')
  const player = document.querySelector('.player-video')

  // let width = sliderInner.getAttribute('left')
  // console.log(sliderInner)

  let v = 0
  videos.forEach((video) => {
    video.style.left = `${v * 34.33}%`
    v++
  })

  let currentSlide = 0
  let isAnimation = false

  function changeSlideNumber(direction) {
    if (direction === 'left') {
      if (currentSlide + 1 === videos.length) {
        currentSlide = 0
      } else {
        currentSlide++
      }
    }
    if (direction === 'right') {
      if (currentSlide - 1 === -1) {
        currentSlide = videos.length - 1
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

  function changeVideo() {
    player.setAttribute('src', videoLinks[currentSlide])
    player.setAttribute('poster', posters[currentSlide])
  }

  left.addEventListener('click', () => {
    if (!isAnimation) {
      isAnimation = true
      stopVideo()
      changeSlideNumber('left')
      addCurrent()
      changeVideo()
      leftMove()
    }
  })

  right.addEventListener('click', () => {
    if (!isAnimation) {
      isAnimation = true
      stopVideo()
      changeSlideNumber('right')
      addCurrent()
      changeVideo()
      rightMove()
    }
  })

  // bullets.forEach((bullet) => {
  //   bullet.addEventListener('click', () => {
  //     bullet.classList.toggle('current')
  //   })
  // })

  //player

  const playBtn = document.querySelector('.play-screen')
  const play = document.querySelector('.player-button.play')
  const volume = document.querySelector('.player-button.volume')
  const volumeControl = document.querySelector('.progress.vol-progress')
  const videoControl = document.querySelector('.progress.video-progress')
  const fullscreen = document.querySelector('.player-button.fullscreen')
  const fullscreenPanel = document.querySelector('.video-control-panel')

  function playVideo() {
    if (player.paused) {
      player.play()
      play.classList.toggle('play')
      play.classList.toggle('pause')
      playBtn.style.display = 'none'
    } else {
      player.pause()
      play.classList.toggle('play')
      play.classList.toggle('pause')
      playBtn.style.display = 'block'
    }
  }

  function stopVideo() {
    if (!player.paused) {
      play.classList.add('play')
      play.classList.remove('pause')
      playBtn.style.display = 'block'
    }
  }

  function playerFullscreen() {
    fullscreen.classList.toggle('fullscreen')
    fullscreen.classList.toggle('fullscreen-exit')
    //fullscreenPanel.classList.toggle('fullscreen-video')
    if (player.requestFullscreen()) {
      player.requestFullscreen()
    } else if (player.exitFullscreen()) {
      player.exitFullscreen()
    }
  }

  function muteVolume() {
    let vol = volumeControl.value

    console.log(vol, player)
    volume.classList.toggle('volume')
    volume.classList.toggle('mute')
    if (player.volume) {
      player.volume = 0
    } else {
      player.volume = vol
    }
  }

  playBtn.addEventListener('click', () => {
    playVideo()
  })

  play.addEventListener('click', () => {
    playVideo()
  })

  player.addEventListener('click', () => {
    playVideo()
  })

  volume.addEventListener('click', () => {
    muteVolume()
  })

  volumeControl.addEventListener('input', function () {
    player.volume = volumeControl.value
    const value = volumeControl.value

    volumeControl.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${
      value * 100
    }%, #C4C4C4 ${value * 100}%, #C4C4C4 100%)`

    if (volumeControl.value === '0') {
      volume.classList.remove('volume')
      volume.classList.add('mute')
    } else {
      volume.classList.add('volume')
      volume.classList.remove('mute')
    }
  })

  function changeDuratiion(time) {
    videoControl.style.background = `linear-gradient(90deg, #710707 0%, #710707 ${time}%, #C4C4C4 ${time}%, #C4C4C4 100%)`
  }

  player.addEventListener('timeupdate', () => {
    const time = (player.currentTime / player.duration) * 100
    changeDuratiion(time)
  })

  videoControl.addEventListener('input', () => {
    const time = (videoControl.value * player.duration) / 100
    player.currentTime = time
  })

  player.addEventListener('ended', () => {
    player.currentTime = 0
    play.classList.add('play')
    play.classList.remove('pause')
    playBtn.style.display = 'block'
  })

  fullscreen.addEventListener('click', () => {
    playerFullscreen()
  })

  const playback = document.querySelector('.playback-rate')

  player.addEventListener('mouseover', hotButtons)

  function hotButtons() {
    document.onkeydown = function (event) {
      if (event.code === 'Space') {
        playVideo()
      }

      if (event.code === 'KeyM') {
        muteVolume()
      }
      if (event.code === 'KeyF') {
        playerFullscreen()
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        document.onkeyup = function (event) {
          if (event.code === 'Comma') {
            player.playbackRate -= 0.1
            playback.innerHTML = `${player.playbackRate.toFixed(1)}x`
            setTimeout(() => {
              playback.innerHTML = ''
            }, 500)
          }
          if (event.code === 'Period') {
            player.playbackRate += 0.1
            playback.innerHTML = `${player.playbackRate.toFixed(1)}x`
            setTimeout(() => {
              playback.innerHTML = ''
            }, 500)
          }
        }
      }
    }
  }
}
