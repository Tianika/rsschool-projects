export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5)
  return arr
}

export function randomNumber(number) {
  return Math.floor(Math.random() * number)
}

export async function changeBgImage(element, number) {
  let link = `https://raw.githubusercontent.com/Tianika/image-data/master/full/${number}full.jpg`

  const imgBg = new Image()
  const body = document.querySelector('body')

  imgBg.src = await link

  imgBg.addEventListener('load', () => {
    element.style.backgroundImage = `url(${link})`
    body.style.backgroundImage = `url(${link})`
  })
}

export function pageChangeAnimation(page) {
  const root = document.querySelector('.root')

  setTimeout(() => {
    root.classList.add('animated')
  }, 0)
  setTimeout(() => {
    page.run()
  }, 300)
  setTimeout(() => {
    root.classList.remove('animated')
  }, 600)
}

export function modalAnimation() {
  const modal = document.querySelector('.modal-answer')
  const modalContainer = document.querySelector('.modal-answer-container')

  setTimeout(() => {
    modal.classList.remove('animated')
    modalContainer.classList.remove('animated')
  }, 800)
}
