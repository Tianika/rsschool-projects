export class AnswerImages {
  constructor(name, rightName) {
    this.name = name
    this.rightName = rightName
  }

  renderAnswer(i, imageNum) {
    this.name === this.rightName
      ? (this.isRight = 'right')
      : (this.isRight = 'error')

    const images = document.querySelectorAll('.answer-picture')
    const img = images[i]
    img.style.backgroundImage = `url(../assets/img/img/${imageNum}.jpg)`
    img.dataset.right = this.isRight
  }
}
export default AnswerImages
