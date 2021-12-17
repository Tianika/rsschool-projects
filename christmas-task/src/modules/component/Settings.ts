import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { sortAscend, sortDescend } from '../utils/sort';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import {
  sortTypes,
  IS_FAVORITE,
  SORT_INDEX,
  VALUES_FOR_FILTER,
  SLIDER_VALUES,
} from '../utils/constants';
import { checkToyCard, checkFilter } from '../utils/general';

export class Settings {
  valuesForFilter: any;

  constructor() {
    this.valuesForFilter = {
      shape: new Set(),
      color: new Set(),
      size: new Set(),
      favorite: new Set(),
      count: {
        min: SLIDER_VALUES.countMin,
        max: SLIDER_VALUES.countMax,
      },
      year: {
        min: SLIDER_VALUES.yearMin,
        max: SLIDER_VALUES.yearMax,
      },
    };
  }

  draw(): void {
    //count slider
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
              const min = parseInt(values[0].toString(), SLIDER_VALUES.decimal);
              const max = parseInt(values[1].toString(), SLIDER_VALUES.decimal);

              this.valuesForFilter.count.min = min;
              this.valuesForFilter.count.max = max;

              countDivs[0].innerHTML = min.toString();
              countDivs[1].innerHTML = max.toString();

              checkToyCard(this.valuesForFilter);
            }
          }
        );
      }
    }

    //year slider
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
            const min = parseInt(values[0].toString(), SLIDER_VALUES.decimal);
            const max = parseInt(values[1].toString(), SLIDER_VALUES.decimal);

            this.valuesForFilter.year.min = min;
            this.valuesForFilter.year.max = max;

            yearDivs[0].innerHTML = min.toString();
            yearDivs[1].innerHTML = max.toString();

            checkToyCard(this.valuesForFilter);
          }
        }
      );
    }

    //shapes filter
    const shapes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.shape-choice-item');

    shapes.forEach((elem) => {
      elem.addEventListener('change', (e: any): void => {
        if (!e) return;

        if (e.target.checked) {
          this.valuesForFilter.shape.add(VALUES_FOR_FILTER[e.target.id]);
        } else {
          this.valuesForFilter.shape.delete(VALUES_FOR_FILTER[e.target.id]);
        }

        checkToyCard(this.valuesForFilter);
      });
    });

    //colors filter
    const colors: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.color-choice-item');

    colors.forEach((elem) => {
      elem.addEventListener('change', (e: any): void => {
        if (!e) return;

        if (e.target.checked) {
          this.valuesForFilter.color.add(VALUES_FOR_FILTER[e.target.id]);
        } else {
          this.valuesForFilter.color.delete(VALUES_FOR_FILTER[e.target.id]);
        }

        checkToyCard(this.valuesForFilter);
      });
    });

    //sizes filter
    const sizes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.size-choice-item');

    sizes.forEach((elem) => {
      elem.addEventListener('change', (e: any): void => {
        if (!e) return;

        if (e.target.checked) {
          this.valuesForFilter.size.add(VALUES_FOR_FILTER[e.target.id]);
        } else {
          this.valuesForFilter.size.delete(VALUES_FOR_FILTER[e.target.id]);
        }

        checkToyCard(this.valuesForFilter);
      });
    });

    //favorite filter
    const favorite = document.querySelector(
      '.favorite-choice-item'
    ) as HTMLInputElement;

    favorite.addEventListener('change', (e: any): void => {
      if (!e) return;

      if (e.target.checked) {
        this.valuesForFilter.favorite = IS_FAVORITE.true;
      } else {
        this.valuesForFilter.favorite = IS_FAVORITE.false;
      }

      checkToyCard(this.valuesForFilter);
    });

    //sort
    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement;

    selectSortType?.addEventListener('change', function () {
      const index = this.selectedIndex;

      switch (index) {
        case 0:
          sortDescend(sortTypes.default);
          break;
        case 1:
          sortDescend(sortTypes.sortFromLetters);
          break;
        case 2:
          sortAscend(sortTypes.sortFromLetters);
          break;
        case 3:
          sortAscend(sortTypes.sortFromYear);
          break;
        case 4:
          sortDescend(sortTypes.sortFromYear);
          break;
      }
    });

    //reset button

    //default button
    const defaultButton = document.querySelector(
      '.default-settings-button'
    ) as HTMLButtonElement;

    defaultButton.addEventListener('click', (): void => {
      selectSortType.selectedIndex = SORT_INDEX.default;

      const toyCard = new ToyCard();
      toyCard.draw(data);
    });
  }
}
