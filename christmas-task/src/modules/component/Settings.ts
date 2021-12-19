import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { sortAscend, sortDescend } from '../utils/sort';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import { sortTypes } from '../utils/constants';
import {
  IS_FAVORITE,
  SORT_INDEX,
  VALUES_FOR_FILTER,
  SLIDER_VALUES,
  NOT_FOUND,
  DEFAULT_STRING,
} from '../utils/constants';
import {
  checkToyCard,
  resetValueForFilter,
  resetCheckboxes,
  resetSearch,
  resetSlider,
} from '../utils/general';

export class Settings {
  valuesForFilter: any;

  constructor() {
    this.valuesForFilter = {
      shape: new Set(),
      color: new Set(),
      size: new Set(),
      favorite: IS_FAVORITE.false,
      count: {
        min: SLIDER_VALUES.countMin,
        max: SLIDER_VALUES.countMax,
      },
      year: {
        min: SLIDER_VALUES.yearMin,
        max: SLIDER_VALUES.yearMax,
      },
      search: new Set(),
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

    selectSortType.addEventListener('change', function (): void {
      const index: number = this.selectedIndex;

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

    //search input
    const searchInput = document.querySelector(
      '.search-input'
    ) as HTMLInputElement;

    searchInput.addEventListener('input', (): void => {
      const cards: NodeListOf<HTMLElement> =
        document.querySelectorAll('.toy-card');
      const searchValue: string = searchInput.value.trim().toLowerCase();

      if (searchValue.length > 0 && searchInput === document.activeElement) {
        clearSearchBtn?.classList.remove('hide');
      } else {
        clearSearchBtn?.classList.add('hide');
      }

      cards.forEach((card) => {
        const title = card.querySelector('.toy-card-title') as HTMLElement;
        const titleValue: string = title.innerText.toLowerCase();

        if (titleValue.search(searchValue) === NOT_FOUND) {
          this.valuesForFilter.search.add(card.dataset.num);
        } else {
          this.valuesForFilter.search.delete(card.dataset.num);
        }
      });

      checkToyCard(this.valuesForFilter);
    });

    const clearSearchBtn = document.querySelector(
      '.clear-search'
    ) as HTMLButtonElement;

    clearSearchBtn.addEventListener('click', () => {
      resetSearch(searchInput, clearSearchBtn);
      searchInput.focus();

      this.valuesForFilter.search.clear();
      checkToyCard(this.valuesForFilter);
    });

    //reset button
    const resetBtn = document.querySelector(
      '.reset-filter-button'
    ) as HTMLElement;

    resetBtn.addEventListener('click', () => {
      resetSlider(countSlider, yearSlider);
      resetSearch(searchInput, clearSearchBtn);
      resetValueForFilter(this.valuesForFilter);
      resetCheckboxes();
      checkToyCard(this.valuesForFilter);
    });

    //default button
    const defaultBtn = document.querySelector(
      '.default-settings-button'
    ) as HTMLButtonElement;

    defaultBtn.addEventListener('click', (): void => {
      selectSortType.selectedIndex = SORT_INDEX.default;

      resetSlider(countSlider, yearSlider);
      resetSearch(searchInput, clearSearchBtn);
      resetValueForFilter(this.valuesForFilter);
      resetCheckboxes();
      checkToyCard(this.valuesForFilter);

      const toyCard = new ToyCard();
      toyCard.draw(data);
    });
  }
}
