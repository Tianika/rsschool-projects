import { CardScore, Footer } from '../components'
import { START_VALUES } from '../../utils/constants'

class Score {
  constructor(number) {
    this.container = document.querySelector('.root')
    this.quiz = Number(number)
    this.title =
      this.quiz < START_VALUES.numberOfRounds
        ? this.quiz + START_VALUES.shiftByOne
        : (this.quiz % START_VALUES.numberOfRounds) + START_VALUES.shiftByOne
    this.arrayOfResults = JSON.parse(localStorage.resultsArtQuiz)[number][
      'roundResult'
    ]
  }

  run() {
    const footer = Footer()

    const page = `
        <div class="main-screen select-categories">
        <header class="header select-header">
          <div class="title">
            <span class="color-name">Art</span> Quiz <br />
            <span class="category-name">Score</span>
          </div>
          <div class="title-small"><span class="color-name">A</span>Q</div>
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

  async createCards() {
    const main = document.querySelector('.score-container')

    for (let i = 0; i < 10; i++) {
      const card = new CardScore(
        this.quiz,
        i,
        this.title,
        this.arrayOfResults[i]
      )

      const innerMain = await card.renderCard()

      main.innerHTML += innerMain
    }
  }
}

export default Score
