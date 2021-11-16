import { Footer } from '../components/Footer'

class Home {
  constructor() {
    this.container = document.querySelector('.root')
  }

  run() {
    let footer = Footer()

    let page = `
      <div class="main-screen first-screen">
        <header class="header">
          <button class="settings-button" href="#settings"></button>
        </header>
        <main class="main">
          <div class="title"><span class="color-name">Art</span> Quiz</div>
          <div class="buttons main-buttons">
            <button class="button-general button-artist" >Artist quiz</button>
            <button class="button-general button-pictures">
              Pictures quiz
            </button>
          </div>
        </main>
        ${footer}
      </div>
        `

    this.container.innerHTML = page
  }
}
export default Home
