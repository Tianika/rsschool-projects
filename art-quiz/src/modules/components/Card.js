import { PAGES, START_VALUES, SAVE_RESULT } from '../../utils';

class Card {
  constructor(subtitle, number) {
    this.subtitle = (subtitle + 1).toString().padStart(2, '0');
    this.number = number;
    this.hide = SAVE_RESULT.cardScoreHide;
    this.play = SAVE_RESULT.noPlay;
  }

  renderCard(category) {
    if (category === PAGES.picture) {
      this.number = this.number + START_VALUES.numberOfRounds;
    }

    if (localStorage.resultsArtQuiz) {
      const resultQuiz = JSON.parse(localStorage.resultsArtQuiz)[this.number];

      if (resultQuiz) {
        this.hide = resultQuiz.hide;
        this.play = resultQuiz.play;
        this.score = resultQuiz.score;
      }
    }

    const component = ` 
            <div class="card-categories ${this.play}">
              <div class="card-title">
                <div class="card-subtitle">${this.subtitle}</div>
                <div class="${this.hide}">${this.score} / 10</div>
              </div>
              <img
                class="card-image ${this.play}"
                src="./assets/img/img/${10 * this.number}.jpg"
                alt="card image"
                data-image="${this.number}"
              />
              <div class="card-score-button up" data-card="${
                this.number
              }">Score</div>
            </div>
  `;
    return component;
  }
}
export default Card;
