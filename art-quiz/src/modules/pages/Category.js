import { Footer } from '../components/Footer'

class Category {
  constructor(nameQuiz) {
    this.container = document.querySelector('.root')
    this.quiz = nameQuiz
  }

  async run() {
    let footer = await Footer.render()
    console.log(Footer)
    let page = {
      render: async () => {
        return /*html*/ `
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
      },
      after_render: async () => {},
    }
    this.container.innerHTML = await page.render()
  }
}

export default Category
