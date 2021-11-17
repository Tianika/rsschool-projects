export class AnswerWindow {
  constructor(answer) {
    this.author = answer.author
    this.name = answer.name
    this.year = answer.year
  }

  renderAnswer() {
    console.log(this.author, this.name, this.year)

    let component = ` 
    <div class="modal-answer">
        <div class="modal-answer-container">
          <div class="modal-answer-image"></div>
          <div class="modal-answer-name">${this.name}</div>
          <div class="modal-answer-describe">${this.author}, ${this.year}</div>
          <button class="button-general button-next">Next</button>
        </div>
      </div>
  `
    return component
  }
}
export default AnswerWindow
