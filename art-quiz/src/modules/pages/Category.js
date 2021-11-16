import Card from '../components/Card'
import { Footer } from '../components/Footer'

class Category {
  constructor(nameQuiz) {
    this.container = document.querySelector('.root')
    this.quiz = nameQuiz
  }

  run(category) {
    let footer = Footer()

    let page = `
        <div class="main-screen select-categories">
        <header class="header select-header">
          <div class="title">
            <span class="color-name">Art</span> Quiz <br />
            <span class="category-name">${this.quiz}</span>
          </div>
          <div class="buttons buttons-header">
            <button class="button-general button-header home-button">Home</button>
            
          </div>
          <button class="settings-button"></button>
        </header>
        <main class="main categories-container">
            
          </main>
        ${footer}
        `

    this.container.innerHTML = page

    this.createCards(category)
  }

  createCards(category) {
    const main = document.querySelector('.categories-container')

    for (let i = 0; i < 12; i++) {
      const card = new Card(i, 0, i)
      const innerMain = card.renderCard(category)

      main.innerHTML += innerMain
    }
  }
}

export default Category
