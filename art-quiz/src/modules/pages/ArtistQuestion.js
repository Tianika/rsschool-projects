import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

class ArtistQuestion {
  constructor() {
    this.container = document.querySelector('.root')
  }

  run() {
    let footer = Footer()
    let header = Header()

    let page = `
    <div class="main-screen select-categories">
    ${header}
    <main class="main question-container">
       <div class="question-title">Кто автор картины?</div>
       <div class="question-artist-image"></div>
       <div class="question-artist-answers">
          <button class="artist-answer">Ответ 1</button>
          <button class="artist-answer">Ответ 2</button>
          <button class="artist-answer">Ответ 3</button>
          <button class="artist-answer">Ответ 4</button>
       </div>
     </main>
    ${footer}
        `

    this.container.innerHTML = page
  }
}
export default ArtistQuestion
