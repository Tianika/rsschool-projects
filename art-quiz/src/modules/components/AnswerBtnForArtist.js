import { ANSWER } from '../../utils';

export class AnswerBtnForArtist {
  constructor(name, rightName) {
    this.name = name;
    this.rightName = rightName;
  }

  renderAnswer() {
    this.name === this.rightName
      ? (this.isRight = ANSWER.right)
      : (this.isRight = ANSWER.error);

    const component = ` 
    <button class="answer artist-answer" data-right=${this.isRight}>${this.name}</button>
  `;
    return component;
  }
}
export default AnswerBtnForArtist;
