export function getRandomNum() {
  let randomNum = Math.ceil(Math.random() * 20)

  return randomNum
}

export function setBg(time, number) {
  const body = document.querySelector('body')
  const imgBg = new Image()

  let link = `https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${
    time === 'afternoon' ? 'day' : time
  }/${number.toString().padStart(2, '0')}.jpg`

  imgBg.src = link

  imgBg.addEventListener(
    'load',
    () => (body.style.backgroundImage = `url(${link})`)
  )
}

export function getNextSlide(num) {
  if (num === 20) {
    num = 1
  } else {
    num++
  }

  return num
}

export function getPrevSlide(num) {
  if (num === 1) {
    num = 20
  } else {
    num--
  }

  return num
}
