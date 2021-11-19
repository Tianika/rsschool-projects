import CardScore from '../components/CardScore'
import { Footer } from '../components/Footer'

class Score {
  constructor(number) {
    this.container = document.querySelector('.root')
    this.quiz = Number(number)
    this.title = this.quiz < 12 ? this.quiz + 1 : (this.quiz % 12) + 1
  }

  createPage() {
    let footer = Footer()

    let page = `
        <div class="main-screen select-categories">
        <header class="header select-header">
          <div class="title">
            <span class="color-name">Art</span> Quiz <br />
            <span class="category-name">Score</span>
          </div>
          <div class="buttons buttons-header">
            <button class="button-general button-header home-button">Home</button>
            <button class="button-general button-header category-button">Categories</button>
          </div>
          <button class="settings-button"></button>
        </header>
        <main class="main score-container">
          
        </main>
        ${footer}
        `

    this.container.innerHTML = page

    this.createCards()
  }

  createCards() {
    const main = document.querySelector('.score-container')

    for (let i = 0; i < 10; i++) {
      const card = new CardScore(this.quiz, i, this.title)
      const innerMain = card.renderCard()

      main.innerHTML += innerMain
    }
  }
}

export default Score
