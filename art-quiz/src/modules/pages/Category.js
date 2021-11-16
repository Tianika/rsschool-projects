import { Footer } from '../components/Footer'

class Category {
  constructor(nameQuiz) {
    this.container = document.querySelector('.root')
    this.quiz = nameQuiz
  }

  run() {
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
          <div class="card-categories">
            <div class="card-title">
              <div class="card-subtitle">01</div>
              <div class="card-score">5 / 10</div>
            </div>
            <img
              class="card-image"
              src="./assets/img/img/0.jpg"
              alt="card image"
            />
            <div class="card-score-button up">Score</div>
          </div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
          <div class="card-categories"></div>
        </main>
        ${footer}
        `

    this.container.innerHTML = page
  }
}

export default Category
