import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { sortToys } from '../utils/sort';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import {
  IS_FAVORITE,
  SORT_INDEX,
  VALUES_FOR_FILTER,
  SLIDER_VALUES,
  NOT_FOUND,
} from '../utils/constants';
import {
  checkToyCard,
  resetValueForFilter,
  resetCheckboxes,
  resetSearch,
  resetSlider,
  addCheckboxSelection,
  addSliderValue,
} from '../utils/general';
import { IValuesForFilter, ICard, ISaveValues } from '../utils/interfaces';

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

      const countDivs: Array<Element | null> = [
        document.querySelector('.count-slider-min'),
        document.querySelector('.count-slider-max'),
      ];

      if (countSlider.noUiSlider) {
        countSlider.noUiSlider.on(
          'update',
          (values: Array<string | number>, handle: number) => {
            if (countDivs[0] && countDivs[1]) {
              const min: number = parseInt(
                values[0].toString(),
                SLIDER_VALUES.decimal
              );
              const max: number = parseInt(
                values[1].toString(),
                SLIDER_VALUES.decimal
              );

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

    const yearDivs: Array<Element | null> = [
      document.querySelector('.year-slider-min'),
      document.querySelector('.year-slider-max'),
    ];

    if (yearSlider.noUiSlider) {
      yearSlider.noUiSlider.on(
        'update',
        (values: Array<string | number>, handle: number) => {
          if (yearDivs[0] && yearDivs[1]) {
            const min: number = parseInt(
              values[0].toString(),
              SLIDER_VALUES.decimal
            );
            const max: number = parseInt(
              values[1].toString(),
              SLIDER_VALUES.decimal
            );

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

    shapes.forEach((elem: HTMLInputElement): void => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const id: string = target.id;
        const value: string = VALUES_FOR_FILTER[id];

        if (target.checked) {
          this.valuesForFilter.shape.add(value);
        } else {
          this.valuesForFilter.shape.delete(value);
        }

        checkToyCard(this.valuesForFilter);
      });
    });

    //colors filter
    const colors: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.color-choice-item');

    colors.forEach((elem: HTMLInputElement): void => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const value: string = VALUES_FOR_FILTER[target.id];

        if (target.checked) {
          this.valuesForFilter.color.add(value);
        } else {
          this.valuesForFilter.color.delete(value);
        }

        checkToyCard(this.valuesForFilter);
      });
    });

    //sizes filter
    const sizes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.size-choice-item');

    sizes.forEach((elem) => {
      elem.addEventListener('change', (e: Event): void => {
        if (!e) return;

        const target = e.target as HTMLInputElement;
        const value: string = VALUES_FOR_FILTER[target.id];

        if (target.checked) {
          this.valuesForFilter.size.add(value);
        } else {
          this.valuesForFilter.size.delete(value);
        }

        checkToyCard(this.valuesForFilter);
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
    });

    //sort
    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement;

    selectSortType.addEventListener('change', function (): void {
      const index: number = this.selectedIndex;

      sortToys(index);
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

    clearSearchBtn.addEventListener('click', (): void => {
      resetSearch(searchInput, clearSearchBtn);
      searchInput.focus();

      this.valuesForFilter.search.clear();
      checkToyCard(this.valuesForFilter);
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
      delete localStorage.countFavoriteToys;

      const toyCard: ToyCard = new ToyCard();
      toyCard.draw(data);
    });

    //load from local storage
    if (localStorage.filterForChristmasGame)
      window.addEventListener('DOMContentLoaded', () => {
        const saveValuesFilter: ISaveValues = JSON.parse(
          localStorage.filterForChristmasGame
        );

        addCheckboxSelection(saveValuesFilter);
        addSliderValue(countSlider, yearSlider, saveValuesFilter);

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

        // console.log(this.valuesForFilter);
        checkToyCard(this.valuesForFilter);

        selectSortType.selectedIndex = saveValuesFilter.sort;
        sortToys(selectSortType.selectedIndex);

        const favoriteToys: Array<string> = [...saveValuesFilter.userFavorite];

        if (favoriteToys.length > 0) {
          const cards = document.querySelectorAll(
            '.toy-card'
          ) as NodeListOf<ICard>;
          const toysCount = document.querySelector(
            '.toys-count'
          ) as HTMLElement;

          toysCount.innerText = localStorage.countFavoriteToys;

          cards.forEach((card: ICard): void => {
            if (favoriteToys.includes(card.dataset.num)) {
              card.classList.add('user-favorite-toy');
            }
          });
        }
      });

    //save to local storage
    window.addEventListener('beforeunload', () => {
      const userFavoriteToys = document.querySelectorAll(
        '.user-favorite-toy'
      ) as NodeListOf<HTMLDivElement>;
      const userFavoriteNums: Array<string> = [];

      if (userFavoriteToys) {
        userFavoriteToys.forEach((toy: any): void => {
          if (toy) {
            userFavoriteNums.push(toy.dataset.num);
          }
        });
      }

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
        userFavorite: [...userFavoriteNums],
        sort: selectSortType.selectedIndex,
        search: [],
      };

      localStorage.filterForChristmasGame = JSON.stringify(valueFilterForSave);
    });
  }
}

export default Settings;
