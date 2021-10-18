const body = document.querySelector('body')
const imgBg = new Image()

export function changeBackground() {
  body.style.backgroundImage =
    "url('https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/day/05.jpg')"
}

export function getRandomNum() {
  let randomNum = Math.ceil(Math.random() * 20)

  return randomNum
}

export function setBg(time, number) {
  let link = `url('https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${
    'afternoon' ? 'day' : time
  }/${number.toString().padStart(2, '0')}.jpg')`

  body.style.backgroundImage = link

  // imgBg.src = link

  // imgBg.addEventListener('load', () => ())
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
