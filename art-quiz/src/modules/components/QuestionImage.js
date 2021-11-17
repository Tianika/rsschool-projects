export class QuestionImage {
  constructor(number) {
    this.number = number
  }

  renderQuestion() {
    const container = document.querySelector('.question-artist-image')

    container.style.backgroundImage = `url(../assets/img/full/${this.number}full.jpg)`
  }
}
export default QuestionImage
