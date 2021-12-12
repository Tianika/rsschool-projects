import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export class Slider {
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

      const countDivs = [
        document.querySelector('.count-slider-min'),
        document.querySelector('.count-slider-max'),
      ]

      countSlider.noUiSlider.on(
        'update',
        (values: Array<string>, handle: number) => {
          if (countDivs[0] && countDivs[1]) {
            countDivs[0].innerHTML = values[0].split('.')[0]
            countDivs[1].innerHTML = values[1].split('.')[0]
          }
        }
      )
    }

    const yearSlider = document.querySelector('#year-slider') as HTMLElement
    if (yearSlider) {
      noUiSlider.create(yearSlider, {
        start: [1940, 2020],
        connect: true,
        range: {
          min: 1940,
          max: 2020,
        },
        step: 10,
      })
    }

    const yearDivs = [
      document.querySelector('.year-slider-min'),
      document.querySelector('.year-slider-max'),
    ]

    yearSlider.noUiSlider.on(
      'update',
      (values: Array<string>, handle: number) => {
        if (yearDivs[0] && yearDivs[1]) {
          yearDivs[0].innerHTML = values[0].split('.')[0]
          yearDivs[1].innerHTML = values[1].split('.')[0]
        }
      }
    )
  }
}
