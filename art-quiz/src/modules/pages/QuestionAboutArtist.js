import { Header, Footer } from '../components'

class QuestionAboutArtist {
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
       <div class="question-artist-image">
        <div class="bullet-container">               
        </div>
       </div>
       <div class="question-artist-answers">
          
       </div>
     </main>
    ${footer}
        `

    this.container.innerHTML = page
  }
}
export default QuestionAboutArtist
