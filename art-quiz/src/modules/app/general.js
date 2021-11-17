export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5)
  return arr
}

export function randomNumber(number) {
  return Math.floor(Math.random() * number)
}

export function changeBgImage(element, number) {
  element.style.backgroundImage = `url(../assets/img/full/${number}full.jpg)`
}
