export class GrandResultWindow {
  constructor() {}

  render() {
    const component = ` 
    <div class="modal-answer">
        <div class="modal-answer-container">
          <div class="modal-answer-grand-logo"></div>
          <div class="modal-answer-grand">Grand result!</div>
          <div class="modal-answer-grand-congrat">Congratulations!</div>

          <div class="buttons modal-buttons">
            <button class="button-general home-button">Home</button>
            <button class="button-general next-quiz-button">Next quiz</button>
          </div>
        </div>
      </div>
  `
    return component
  }
}
export default GrandResultWindow
