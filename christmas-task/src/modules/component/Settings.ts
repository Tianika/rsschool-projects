import { Slider } from './Slider'

export class Settings {
  slider: Slider

  constructor() {
    this.slider = new Slider()
  }

  draw(): void {
    if (this.slider) this.slider.draw()
  }
}
