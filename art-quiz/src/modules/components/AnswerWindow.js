export class AnswerWindow {
  constructor(answer) {
    this.author = answer.author
    this.name = answer.name
    this.year = answer.year
  }

  renderAnswer() {
    const component = ` 
    <div class="modal-answer animated">
        <div class="modal-answer-container animated">
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
