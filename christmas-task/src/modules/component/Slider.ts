import * as noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export class Slider {
  draw(): void {
    const countSlider = document.querySelector(
      '#count-slider'
    ) as noUiSlider.target
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

      if (countSlider.noUiSlider) {
        countSlider.noUiSlider.on(
          'update',
          (values: Array<string | number>, handle: number) => {
            if (countDivs[0] && countDivs[1]) {
              countDivs[0].innerHTML = parseInt(
                values[0].toString(),
                10
              ).toString()
              countDivs[1].innerHTML = parseInt(
                values[1].toString(),
                10
              ).toString()
            }
          }
        )
      }
    }

    const yearSlider = document.querySelector(
      '#year-slider'
    ) as noUiSlider.target
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

    if (yearSlider.noUiSlider) {
      yearSlider.noUiSlider.on(
        'update',
        (values: Array<string | number>, handle: number) => {
          if (yearDivs[0] && yearDivs[1]) {
            yearDivs[0].innerHTML = parseInt(
              values[0].toString(),
              10
            ).toString()
            yearDivs[1].innerHTML = parseInt(
              values[1].toString(),
              10
            ).toString()
          }
        }
      )
    }
  }
}
