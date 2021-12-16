import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { SLIDER_VALUES } from '../utils/constants';

export class Slider {
  draw(): void {
    const countSlider = document.querySelector(
      '#count-slider'
    ) as noUiSlider.target;

    if (countSlider) {
      noUiSlider.create(countSlider, {
        start: [SLIDER_VALUES.countMin, SLIDER_VALUES.countMax],
        connect: true,
        range: {
          min: SLIDER_VALUES.countMin,
          max: SLIDER_VALUES.countMax,
        },
        step: SLIDER_VALUES.countStep,
      });

      const countDivs = [
        document.querySelector('.count-slider-min'),
        document.querySelector('.count-slider-max'),
      ];

      if (countSlider.noUiSlider) {
        countSlider.noUiSlider.on(
          'update',
          (values: Array<string | number>, handle: number) => {
            if (countDivs[0] && countDivs[1]) {
              countDivs[0].innerHTML = parseInt(
                values[0].toString(),
                SLIDER_VALUES.decimal
              ).toString();
              countDivs[1].innerHTML = parseInt(
                values[1].toString(),
                SLIDER_VALUES.decimal
              ).toString();
            }
          }
        );
      }
    }

    const yearSlider = document.querySelector(
      '#year-slider'
    ) as noUiSlider.target;

    if (yearSlider) {
      noUiSlider.create(yearSlider, {
        start: [SLIDER_VALUES.yearMin, SLIDER_VALUES.yearMax],
        connect: true,
        range: {
          min: SLIDER_VALUES.yearMin,
          max: SLIDER_VALUES.yearMax,
        },
        step: SLIDER_VALUES.yearStep,
      });
    }

    const yearDivs = [
      document.querySelector('.year-slider-min'),
      document.querySelector('.year-slider-max'),
    ];

    if (yearSlider.noUiSlider) {
      yearSlider.noUiSlider.on(
        'update',
        (values: Array<string | number>, handle: number) => {
          if (yearDivs[0] && yearDivs[1]) {
            yearDivs[0].innerHTML = parseInt(
              values[0].toString(),
              SLIDER_VALUES.decimal
            ).toString();
            yearDivs[1].innerHTML = parseInt(
              values[1].toString(),
              SLIDER_VALUES.decimal
            ).toString();
          }
        }
      );
    }
  }
}
