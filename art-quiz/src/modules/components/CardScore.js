import { START_VALUES } from '../../utils/constants';
import images from '../../assets/data/images.json';

class CardScore {
  constructor(category, number, title, result) {
    this.title = title;
    this.cardNumber = category * START_VALUES.questionsPerRound + number;
    this.result = result;
    this.info = images[this.cardNumber];
  }

  async renderCard() {
    const formattedTitle = this.title.toString().padStart(2, '0');

    const component = ` 
    <div class="card-score ${this.result}">
      <div class="card-score-title">${formattedTitle}</div>
      <img
        class="card-score-image ${this.result}"
        src="./assets/img/img/${this.info.imageNum}.jpg"
        alt="score image"
      />
      <div class="card-score-info">
        <div class="score-info-name">${this.info.name}</div>
        <div class="score-info-author">${this.info.author}, ${this.info.year}</div>
      </div>
  </div>
  `;
    return component;
  }
}

export default CardScore;
