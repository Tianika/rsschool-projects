export class GameOverWindow {
  constructor() {}

  render() {
    const component = ` 
    <div class="modal-answer">
        <div class="modal-answer-container">
          <div class="game-over-logo"></div>
          <div class="game-over-title">Game over</div>
          <div class="game-over-subtitle">Play again?</div>
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
export default GameOverWindow;
