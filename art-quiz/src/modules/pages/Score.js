import Card from '../components/Card'
import { Footer } from '../components/Footer'

class Score {
  constructor(number) {
    this.container = document.querySelector('.root')
    this.quiz = number
  }

  run(category) {
    let footer = Footer()

    let page = `
        <div class="main-screen select-categories">
        <header class="header select-header">
          <div class="title">
            <span class="color-name">Art</span> Quiz <br />
            <span class="category-name">Score</span>
          </div>
          <div class="buttons buttons-header">
            <button class="button-general button-header">Home</button>
            <button class="button-general button-header">Categories</button>
          </div>
          <button class="settings-button"></button>
        </header>
        <main class="main score-container">
          <div class="card-score">
            <div class="card-score-title">01</div>
            <img
              class="card-score-image"
              src="./assets/img/img/0.jpg"
              alt="score image"
            />
            <div class="card-score-info">
              <div class="score-info-name">Name</div>
              <div class="score-info-author">Author, year</div>
            </div>
          </div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
          <div class="card-score"></div>
        </main>
        ${footer}
        `

    this.container.innerHTML = page

    this.createCards(category)
  }

  createCards(category) {
    const main = document.querySelector('.categories-container')

    for (let i = 0; i < 10; i++) {
      const card = new Card(i, i)
      const innerMain = card.renderCard(category)

      main.innerHTML += innerMain
    }
  }
}

export default Score
