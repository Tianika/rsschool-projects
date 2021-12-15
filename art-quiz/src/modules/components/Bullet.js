export class Bullet {
  constructor(isRight) {
    this.isRight = isRight
  }

  renderBullet() {
    const component = ` 
    <div class="answer-bullet ${this.isRight}"></div>
  `
    return component
  }
}
export default Bullet
