import { Header, Footer } from '../components'

class QuestionAboutPicture {
  constructor() {
    this.container = document.querySelector('.root')
  }

  run() {
    let footer = Footer()
    let header = Header()

    let page = `
    <div class="main-screen select-categories">
    ${header}
    <main class="main question-container picture">
          <div class="question-title">
            Какую картину написал <span class="question-author"></span>?
          </div>
          <div class="question-picture-answers">
            <div class="answer answer-picture"></div>
            <div class="answer answer-picture"></div>
            <div class="answer answer-picture"></div>
            <div class="answer answer-picture"></div>
          </div>
          <div class="bullet-container pictures-quiz"></div>
        </main>
    ${footer}
        `

    this.container.innerHTML = page
  }
}
export default QuestionAboutPicture
