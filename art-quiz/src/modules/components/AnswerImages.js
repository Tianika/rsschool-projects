import { ANSWER } from '../../utils/constants'

export class AnswerImages {
  constructor(name, rightName) {
    this.name = name
    this.rightName = rightName
  }

  async renderAnswer(i, imageNum) {
    this.name === this.rightName
      ? (this.isRight = ANSWER.right)
      : (this.isRight = ANSWER.error)

    const images = document.querySelectorAll('.answer-picture')
    const img = images[i]

    let link = `https://raw.githubusercontent.com/Tianika/image-data/master/img/${imageNum}.jpg`

    const imgBg = new Image()

    imgBg.src = await link

    imgBg.addEventListener(
      'load',
      () => (img.style.backgroundImage = `url(${link})`)
    )

    img.dataset.right = this.isRight
  }
}
export default AnswerImages
