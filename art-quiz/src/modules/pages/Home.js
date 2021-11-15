import { Footer } from '../components/Footer'

class Home {
  constructor() {
    this.container = document.querySelector('.root')
  }

  async run() {
    let footer = await Footer.render()
    console.log(Footer)
    let page = {
      render: async () => {
        return /*html*/ `
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
      },
      after_render: async () => {},
    }
    this.container.innerHTML = await page.render()
  }
}

export default Home
