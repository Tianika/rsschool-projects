import images from '../app/images'

class CardScore {
  constructor(category, number, title) {
    this.title = title
    this.cardNumber = category * 10 + number
    this.info = images[this.cardNumber]
    this.play = 'error'
  }

  renderCard() {
    //   if (localStorage['resultsArtQuiz']) {
    //   const resultQuiz = JSON.parse(localStorage['resultsArtQuiz'])[this.number]

    //   if (resultQuiz) {
    //     this.hide = resultQuiz.hide
    //     this.play = resultQuiz.play
    //     this.score = resultQuiz.score
    //   }
    // }

    let component = ` 
    <div class="card-score">
      <div class="card-score-title">${this.title
        .toString()
        .padStart(2, '0')}</div>
      <img
        class="card-score-image"
        src="./assets/img/img/${this.info.imageNum}.jpg"
        alt="score image"
      />
      <div class="card-score-info">
        <div class="score-info-name">${this.info.name}</div>
        <div class="score-info-author">${this.info.author}, ${
      this.info.year
    }</div>
      </div>
  </div>
  `
    return component
  }
}
export default CardScore
