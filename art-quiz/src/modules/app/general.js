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

  imgBg.src = await link

  imgBg.addEventListener(
    'load',
    () => (element.style.backgroundImage = `url(${link})`)
  )
}
