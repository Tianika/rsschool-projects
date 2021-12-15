export class ResultWindow {
  constructor() {}

  render() {
    const component = ` 
    <div class="modal-answer">
        <div class="modal-answer-container">
          <div class="modal-answer-logo"></div>
          <div class="modal-answer-congrat">Congratulations!</div>
          <div class="modal-answer-score">
            <span class="modal-result-score"></span> / 10
          </div>
          <div class="buttons modal-buttons">
            <button class="button-general home-button">Home</button>
            <button class="button-general next-quiz-button">Next quiz</button>
          </div>
        </div>
      </div>
  `;
    return component;
  }
}

export default ResultWindow;
