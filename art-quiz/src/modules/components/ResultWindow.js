export class ResultWindow {
  constructor() {}

  render() {
    let component = ` 
    <div class="modal-answer">
        <div class="modal-answer-container">
          <div class="modal-answer-logo">Logo</div>
          <div class="modal-answer-congrat">Congratulations</div>
          <div class="modal-answer-score">8 / 10</div>
          <div class="buttons main-buttons">
              <button class="button-general home-button">Home</button>
              <button class="button-general next-quiz-button">
                Next quiz
              </button>
          </div>
        </div>
      </div>
  `
    return component
  }
}
export default ResultWindow
