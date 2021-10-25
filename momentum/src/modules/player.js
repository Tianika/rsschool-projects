export function addAudio(playList) {
  const playListContainer = document.querySelector('.play-list')

  playList.forEach((item) => {
    const li = document.createElement('li')
    const p = document.createElement('p')
    const div = document.createElement('div')
    li.classList.add('play-item')
    div.classList.add('play-time')
    div.textContent = item.duration
    p.textContent = `${item['title']}`
    li.append(p)
    li.append(div)
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
  audio.volume = 0.2

  function playAudio() {
    tracks.forEach((track) => {
      track.classList.remove('item-active')
      track.classList.remove('item-pause')
    })

    playBtn.classList.remove('pause')

    if (!isPlay) {
      audio.src = playList[trackNum].src
      audio.play()
      tracks[trackNum].classList.add('item-active')
      tracks[trackNum].classList.add('item-pause')
      playBtn.classList.add('pause')
      isPlay = true
      showCurrentTrack(playList[trackNum].title)
      showDurationAudio(playList[trackNum].duration)
      showCurrentTimeAudio(playList[trackNum].duration)
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

  function showCurrentTimeAudio() {
    const currentTimeAudio = document.querySelector('.current-time-audio')

    const duration = Math.floor(audio.currentTime)
    currentTimeAudio.innerText = `${Math.floor(duration / 60)
      .toString()
      .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`
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

  const audioInput = document.querySelector('.audio-input')

  audioInput.addEventListener('change', () => {
    audio.currentTime = audioInput.value
  })

  //volume
  const volumeControl = document.querySelector('.volume-input')
  const audioControl = document.querySelector('.audio-input')
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
    return `linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff ${value * 100}%,
      #ffffff7c ${value * 100}%,
      #ffffff7c 100%
    )`
  }

  volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value
    const value = audio.volume

    volumeControl.style.background = changeBgInput(value)

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

  audio.addEventListener('timeupdate', () => {
    const time = audio.currentTime / audio.duration

    audioControl.style.background = changeBgInput(time)
    showCurrentTimeAudio()
  })

  audioControl.addEventListener('input', () => {
    audio.currentTime = audioControl.value
  })
}

//TODO плей при клике по списку с первого раза
