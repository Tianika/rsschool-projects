export function addAudio(playList) {
  const playListContainer = document.querySelector('.play-list')

  playList.forEach((item) => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = `${item['title']}`
    playListContainer.append(li)
  })
}

export function player(playList) {
  const tracks = document.querySelectorAll('.play-item')
  const playBtn = document.querySelector('.play')
  const prevAudioBtn = document.querySelector('.play-prev')
  const nextAudioBtn = document.querySelector('.play-next')

  let trackNum = 0

  const audio = new Audio()
  let isPlay = false

  function playAudio() {
    tracks.forEach((track) => {
      track.classList.remove('item-active')
      track.classList.remove('item-pause')
    })

    playBtn.classList.remove('pause')

    if (!isPlay) {
      audio.src = playList[trackNum].src
      audio.currentTime = 0
      audio.play()
      tracks[trackNum].classList.add('item-active')
      tracks[trackNum].classList.add('item-pause')
      playBtn.classList.add('pause')
      isPlay = true
      showCurrentTrack(playList[trackNum].title)
      showDurationAudio(playList[trackNum].duration)
      showCurrentTimeAudio(playList[trackNum].duration)
      //   console.log(audio.currentTime)
    } else {
      audio.pause()
      isPlay = false
    }
  }

  function playPrev(trackNum) {
    if (trackNum === 0) {
      trackNum = tracks.length - 1
    } else {
      trackNum--
    }
    audio.pause()
    isPlay = false
    return trackNum
  }

  function playNext(trackNum) {
    if (trackNum === tracks.length - 1) {
      trackNum = 0
    } else {
      trackNum++
    }
    audio.pause()
    isPlay = false
    return trackNum
  }

  function showCurrentTrack(name) {
    const currentName = document.querySelector('.current-track-name')

    currentName.innerText = name
  }

  function showDurationAudio(duration) {
    const durationAudio = document.querySelector('.duration-audio')

    durationAudio.innerText = duration
  }

  function showCurrentTimeAudio(duration) {
    const currentTimeAudio = document.querySelector('.current-time-audio')

    let time = duration.split(':')
    let timeAudio = Number(time[0]) * 60 + Number(time[1])

    console.log(timeAudio)
  }

  playBtn.addEventListener('click', () => {
    playAudio()
  })

  prevAudioBtn.addEventListener('click', () => {
    trackNum = playPrev(trackNum)
    playAudio()
  })

  nextAudioBtn.addEventListener('click', () => {
    trackNum = playNext(trackNum)
    playAudio()
  })

  tracks.forEach((track, i, arr) => {
    track.addEventListener('click', () => {
      trackNum = i
      playAudio()
    })
  })

  audio.addEventListener('ended', () => {
    trackNum = playNext(trackNum)
    playAudio()
  })

  //volume
  const volumeControl = document.querySelector('.volume-input')
  const volumeBtn = document.querySelector('.volume-button')

  function muteVolume() {
    let vol = volumeControl.value

    volumeBtn.classList.toggle('volume')
    volumeBtn.classList.toggle('mute')

    if (audio.volume) {
      audio.volume = 0
      changeBgInput(0)
    } else {
      audio.volume = vol
      changeBgInput(vol)
    }
  }

  function changeBgInput(value) {
    volumeControl.style.background = `linear-gradient(
      90deg,
      #343434 0%,
      #343434 ${value * 100}%,
      #ffffff ${value * 100}%,
      #ffffff 100%
    )`
    console.log(volumeControl)
  }

  volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value
    const value = audio.volume

    console.log(value)
    changeBgInput(value)

    if (volumeControl.value === '0') {
      volumeBtn.classList.remove('volume')
      volumeBtn.classList.add('mute')
    } else {
      volumeBtn.classList.add('volume')
      volumeBtn.classList.remove('mute')
    }
  })

  volumeBtn.addEventListener('click', () => {
    muteVolume()
  })
}

//TODO плей при клике по списку с первого раза
