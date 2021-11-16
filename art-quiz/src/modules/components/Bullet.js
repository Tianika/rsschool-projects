export class Bullet {
  constructor(number) {
    this.number = number
    this.isRight = ''
  }

  renderBullet(isRight) {
    if (isRight) {
      this.isRight = isRight
    }

    let component = ` 
    <div class="answer-bullet ${this.isRight}"></div>
  `
    return component
  }
}
export default Bullet
