export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = (Math.floor(Math.random() * (i + 1))[(arr[i], arr[j])] = [
      arr[j],
      arr[i],
    ])
  }
}

export function randomNumber(number) {
  return Math.floor(Math.random() * number)
}

export function changeBgImage(element, number) {
  element.style.backgroundImage = `url(../assets/img/full/${number}full.jpg)`
}
