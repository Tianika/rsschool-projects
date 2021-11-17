class Card {
  constructor(subtitle, number) {
    this.subtitle = (subtitle + 1).toString().padStart(2, '0')
    this.number = number
    this.hide = 'card-score hide'
    this.play = 'card-image no-play'
  }

  renderCard(category) {
    if (category === 'picture') {
      this.number = this.number + 12
    }

    if (localStorage['resultsArtQuiz']) {
      const resultQuiz = JSON.parse(localStorage['resultsArtQuiz'])[this.number]

      if (resultQuiz) {
        this.hide = resultQuiz.hide
        this.play = resultQuiz.play
        this.score = resultQuiz.score
      }
    }

    let component = ` 
            <div class="card-categories">
              <div class="card-title">
                <div class="card-subtitle">${this.subtitle}</div>
                <div class="${this.hide}">${this.score} / 10</div>
              </div>
              <img
                class="${this.play}"
                src="./assets/img/img/${10 * this.number}.jpg"
                alt="card image"
                data-image="${this.number}"
              />
              <div class="card-score-button up" data-card="${
                this.number
              }">Score</div>
            </div>
  `
    return component
  }
}
export default Card
