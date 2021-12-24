import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import {
  sortToys,
  IS_FAVORITE,
  SORT_INDEX,
  VALUES_FOR_FILTER,
  SLIDER_VALUES,
  NOT_FOUND,
  ValuesFilter,
  checkToyCard,
  resetValueForFilter,
  resetCheckboxes,
  resetSearch,
  resetSlider,
  addCheckboxSelection,
  addCountSliderValue,
  addYearSliderValue,
  IValuesForFilter,
  ICard,
  ISaveValues,
} from '../utils';

export class Settings {
  valuesForFilter: IValuesForFilter;

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
    // load from local storage
    if (localStorage.filterForChristmasGame) {
      this.loadSettings();
    }

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

      if (localStorage.filterForChristmasGame) {
        const saveValuesFilter: ISaveValues = JSON.parse(
          localStorage.filterForChristmasGame
        );

        addCountSliderValue(saveValuesFilter, countSlider);
      }

      const countDivs: Array<Element | null> = [
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
              this.saveSettings();
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

    if (localStorage.filterForChristmasGame) {
      const saveValuesFilter: ISaveValues = JSON.parse(
        localStorage.filterForChristmasGame
      );

      addYearSliderValue(saveValuesFilter, yearSlider);
    }

    const yearDivs: Array<Element | null> = [
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
            this.saveSettings();
          }
        }
      );
    }

    //shapes filter
    const shapes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.shape-choice-item');

    shapes.forEach((elem: HTMLInputElement): void => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const id = target.id as ValuesFilter;
        const value = VALUES_FOR_FILTER[id];

        if (target.checked) {
          this.valuesForFilter.shape.add(value);
        } else {
          this.valuesForFilter.shape.delete(value);
        }

        checkToyCard(this.valuesForFilter);
        this.saveSettings();
      });
    });

    //colors filter
    const colors: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.color-choice-item');

    colors.forEach((elem: HTMLInputElement): void => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const id = target.id as ValuesFilter;
        const value = VALUES_FOR_FILTER[id];

        if (target.checked) {
          this.valuesForFilter.color.add(value);
        } else {
          this.valuesForFilter.color.delete(value);
        }

        checkToyCard(this.valuesForFilter);
        this.saveSettings();
      });
    });

    //sizes filter
    const sizes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.size-choice-item');

    sizes.forEach((elem) => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const id = target.id as ValuesFilter;
        const value = VALUES_FOR_FILTER[id];

        if (target.checked) {
          this.valuesForFilter.size.add(value);
        } else {
          this.valuesForFilter.size.delete(value);
        }

        checkToyCard(this.valuesForFilter);
        this.saveSettings();
      });
    });

    //favorite filter
    const favorite = document.querySelector(
      '.favorite-choice-item'
    ) as HTMLInputElement;

    favorite.addEventListener('change', (e: Event): void => {
      if (!e) return;

      const target = e.target as HTMLInputElement;

      if (target.checked) {
        this.valuesForFilter.favorite = IS_FAVORITE.true;
      } else {
        this.valuesForFilter.favorite = IS_FAVORITE.false;
      }

      checkToyCard(this.valuesForFilter);
      this.saveSettings();
    });

    //sort
    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement;

    selectSortType.addEventListener('change', (): void => {
      const index: number = selectSortType.selectedIndex;

      sortToys(index);
      this.saveSettings();
    });

    //search input
    const searchInput = document.querySelector(
      '.search-input'
    ) as HTMLInputElement;

    searchInput.addEventListener('input', (): void => {
      const cards: NodeListOf<ICard> = document.querySelectorAll('.toy-card');
      const searchValue: string = searchInput.value.trim().toLowerCase();

      if (searchValue.length > 0 && searchInput === document.activeElement) {
        clearSearchBtn?.classList.remove('hide');
      } else {
        clearSearchBtn?.classList.add('hide');
      }

      cards.forEach((card: ICard): void => {
        const title = card.querySelector('.toy-card-title') as HTMLElement;
        const titleValue = title.innerText.toLowerCase();

        if (titleValue.search(searchValue) === NOT_FOUND) {
          this.valuesForFilter.search.add(card.dataset.num);
        } else {
          this.valuesForFilter.search.delete(card.dataset.num);
        }
      });

      checkToyCard(this.valuesForFilter);
      this.saveSettings();
    });

    const clearSearchBtn = document.querySelector(
      '.clear-search'
    ) as HTMLButtonElement;

    clearSearchBtn.addEventListener('click', (): void => {
      resetSearch(searchInput, clearSearchBtn);
      searchInput.focus();

      this.valuesForFilter.search.clear();
      checkToyCard(this.valuesForFilter);
      this.saveSettings();
    });

    //reset button
    const resetBtn = document.querySelector(
      '.reset-filter-button'
    ) as HTMLButtonElement;

    resetBtn.addEventListener('click', (): void => {
      resetSlider(countSlider, yearSlider);
      resetSearch(searchInput, clearSearchBtn);
      resetValueForFilter(this.valuesForFilter);
      resetCheckboxes();
      checkToyCard(this.valuesForFilter);
      this.saveSettings();
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
      delete localStorage.filterForChristmasGame;
      delete localStorage.favoriteForChristmasGame;

      const toyCard: ToyCard = new ToyCard();
      toyCard.draw(data);
    });

    window.addEventListener('DOMContentLoaded', this.loadSettings);
    window.addEventListener('beforeunload', this.saveSettings);
  }

  loadSettings() {
    const saveValuesFilter: ISaveValues = JSON.parse(
      localStorage.filterForChristmasGame
    );
    const countSlider = document.querySelector(
      '#count-slider'
    ) as noUiSlider.target;
    const yearSlider = document.querySelector(
      '#year-slider'
    ) as noUiSlider.target;

    addCheckboxSelection(saveValuesFilter);
    addCountSliderValue(saveValuesFilter, countSlider);
    addYearSliderValue(saveValuesFilter, yearSlider);

    if (saveValuesFilter.shape.length > 0) {
      saveValuesFilter.shape.forEach((item: string) => {
        this.valuesForFilter.shape.add(item);
      });
    }
    if (saveValuesFilter.color.length > 0) {
      saveValuesFilter.color.forEach((item: string) => {
        this.valuesForFilter.color.add(item);
      });
    }
    if (saveValuesFilter.size.length > 0) {
      saveValuesFilter.size.forEach((item: string) => {
        this.valuesForFilter.size.add(item);
      });
    }

    this.valuesForFilter.favorite = saveValuesFilter.favorite;
    this.valuesForFilter.count.min = saveValuesFilter.count.min;
    this.valuesForFilter.count.max = saveValuesFilter.count.max;
    this.valuesForFilter.year.min = saveValuesFilter.year.min;
    this.valuesForFilter.year.max = saveValuesFilter.year.max;

    checkToyCard(this.valuesForFilter);

    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement;

    selectSortType.selectedIndex = saveValuesFilter.sort;
    sortToys(saveValuesFilter.sort);
  }

  saveSettings() {
    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement;

    const valueFilterForSave: ISaveValues = {
      shape: [...this.valuesForFilter.shape],
      color: [...this.valuesForFilter.color],
      size: [...this.valuesForFilter.size],
      favorite: this.valuesForFilter.favorite,
      count: {
        min: this.valuesForFilter.count.min,
        max: this.valuesForFilter.count.max,
      },
      year: {
        min: this.valuesForFilter.year.min,
        max: this.valuesForFilter.year.max,
      },
      sort: selectSortType.selectedIndex,
      search: [],
    };

    localStorage.filterForChristmasGame = JSON.stringify(valueFilterForSave);
  }
}

export default Settings;
