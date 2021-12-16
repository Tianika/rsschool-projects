import { Slider } from './Slider';
import { sortAscend, sortDescend } from '../utils/sort';
import data from '../data/data';
import { ToyCard } from './ToyCard';
import { sortTypes } from '../utils/constants';

export class Settings {
  slider: Slider;

  constructor() {
    this.slider = new Slider();
  }

  draw(): void {
    if (this.slider) this.slider.draw();

    const favoriteChoice = document.querySelector(
      '.favorite-choice-item'
    ) as HTMLInputElement;

    favoriteChoice.addEventListener('change', () => {
      const toyCards = document.querySelectorAll('.toy-card');

      if (favoriteChoice.checked) {
        toyCards.forEach((card) => {
          if (card.getAttribute('data-favorite') === 'false') {
            card.classList.add('hidden');
          }
        });
      } else {
        toyCards.forEach((card) => {
          card.classList.remove('hidden');
        });
      }
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
      //localStorage.dataForChristmasGame = JSON.stringify(data)

      const toyCard = new ToyCard();
      toyCard.draw(data);
    });
  }
}
