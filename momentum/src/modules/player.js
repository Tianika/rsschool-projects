export function addAudio(playList) {
  const playListContainer = document.querySelector('.play-list')

  playList.forEach((item) => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.textContent = `${item['title']}`
    playListContainer.append(li)
  })
}

const audio = new Audio()
let isPlay = false

export function playAudio(track) {
  //track.classList.toggle('item-active')

  if (!isPlay) {
    audio.src = track.src
    audio.currentTime = 0
    audio.play()
  } else {
    audio.pause()
  }

  console.log(track)
}
