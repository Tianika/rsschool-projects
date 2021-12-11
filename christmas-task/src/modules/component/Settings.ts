import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export class Settings {
  draw(): void {
    const countSlider = document.querySelector('#count-slider') as HTMLElement
    if (countSlider) {
      noUiSlider.create(countSlider, {
        start: [1, 12],
        connect: true,
        range: {
          min: 1,
          max: 12,
        },
        step: 1,
      })
    }

    const yearSlider = document.querySelector('#year-slider') as HTMLElement
    if (yearSlider) {
      noUiSlider.create(yearSlider, {
        start: [1950, 2020],
        connect: true,
        range: {
          min: 1950,
          max: 2020,
        },
        step: 10,
      })
    }
  }
}
