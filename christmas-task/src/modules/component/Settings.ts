import { Slider } from './Slider';
import { sortAscend, sortDescend } from '../utils/sort';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import {
  sortTypes,
  IS_FAVORITE,
  SORT_INDEX,
  VALUES_FOR_FILTER,
} from '../utils/constants';
import { checkFilter } from '../utils/general';

export class Settings {
  slider: Slider;
  valuesForFilter: any;

  constructor() {
    this.slider = new Slider();
    this.valuesForFilter = {
      shape: new Set(),
      color: new Set(),
      size: new Set(),
      favorite: new Set(),
    };
  }

  draw(): void {
    if (this.slider) this.slider.draw();

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

        const cards: NodeListOf<HTMLElement> =
          document.querySelectorAll('.toy-card');

        cards.forEach((card) => checkFilter(card, this.valuesForFilter));
      });
    });

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

        const cards: NodeListOf<HTMLElement> =
          document.querySelectorAll('.toy-card');

        cards.forEach((card) => checkFilter(card, this.valuesForFilter));
      });
    });

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

        const cards: NodeListOf<HTMLElement> =
          document.querySelectorAll('.toy-card');

        cards.forEach((card) => checkFilter(card, this.valuesForFilter));
      });
    });

    const favorite = document.querySelector(
      '.favorite-choice-item'
    ) as HTMLInputElement;

    favorite.addEventListener('change', (e: any): void => {
      if (!e) return;

      if (e.target.checked) {
        this.valuesForFilter.favorite = VALUES_FOR_FILTER.true;
      } else {
        this.valuesForFilter.favorite = VALUES_FOR_FILTER.false;
      }

      const cards: NodeListOf<HTMLElement> =
        document.querySelectorAll('.toy-card');

      cards.forEach((card) => checkFilter(card, this.valuesForFilter));
    });

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
