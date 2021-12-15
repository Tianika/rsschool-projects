export class QuestionImage {
  constructor(number) {
    this.number = number;
  }

  async renderQuestion() {
    const container = document.querySelector('.question-artist-image');

    let link = `https://raw.githubusercontent.com/Tianika/image-data/master/full/${this.number}full.jpg`;

    const imgBg = new Image();

    imgBg.src = await link;

    imgBg.addEventListener(
      'load',
      () => (container.style.backgroundImage = `url(${link})`)
    );
  }
}
export default QuestionImage;
