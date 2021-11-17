import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Bullet } from '../components/Bullet'
import { QuestionImage } from '../components/QuestionImage'

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
       <div class="question-artist-image">
        <div class="bullet-container">               
        </div>
       </div>
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
    this.addBullets()
    let questionImage = new QuestionImage(0)
    questionImage.renderQuestion()
  }

  addBullets() {
    const container = document.querySelector('.bullet-container')

    for (let i = 0; i < 10; i++) {
      const bullet = new Bullet()

      container.innerHTML += bullet.renderBullet()
    }
  }
}
export default ArtistQuestion
