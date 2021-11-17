class Card {
  constructor(subtitle, score, number) {
    this.subtitle = (subtitle + 1).toString().padStart(2, '0')
    this.score = score.toString().padStart(2, '0')
    this.number = number
    this.hide = 'hide'
    this.play = 'no-play'
  }

  renderCard(category) {
    if (category === 'picture') {
      this.number = this.number + 12
    }

    let component = ` 
            <div class="card-categories">
              <div class="card-title">
                <div class="card-subtitle">${this.subtitle}</div>
                <div class="card-score ${this.hide}">${this.score} / 10</div>
              </div>
              <img
                class="card-image ${this.play}"
                src="./assets/img/img/${10 * this.number}.jpg"
                alt="card image"
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
