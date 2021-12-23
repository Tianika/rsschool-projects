import { Card, Footer } from '../components';
import { TYPE_GAME, CATEGORIES } from '../../utils';

class Category {
  constructor(category) {
    this.container = document.querySelector('.root');
    this.category = category;
    this.quiz =
      category === TYPE_GAME.artist
        ? CATEGORIES.artistQuiz
        : CATEGORIES.picturesQuiz;
  }

  run() {
    const footer = Footer();

    const page = `
        <div class="main-screen select-categories">
        <header class="header select-header">
          <div class="title">
            <span class="color-name">Art</span> Quiz <br />
            <span class="category-name">${this.quiz}</span>
          </div>
          <div class="title-small"><span class="color-name">A</span>Q</div>
          <div class="buttons buttons-header">
            <button class="button-general button-header home-button">Home</button>
            
          </div>
          <button class="settings-button"></button>
        </header>
        <main class="main categories-container">
            
          </main>
        ${footer}
        `;

    this.container.innerHTML = page;

    this.createCards(this.category);
  }

  createCards(category) {
    const main = document.querySelector('.categories-container');

    for (let i = 0; i < 12; i++) {
      const card = new Card(i, i);
      const innerMain = card.renderCard(category);

      main.innerHTML += innerMain;
    }
  }
}

export default Category;
