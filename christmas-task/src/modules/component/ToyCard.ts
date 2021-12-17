import { dataToys } from '../utils/interfaces';
import {
  COUNT_FAVORITE,
  DELAY,
  IS_FAVORITE,
  ATTRIBUTES,
} from '../utils/constants';
import { setAttribute } from '../utils/general';

export class ToyCard {
  draw(data: Array<dataToys>): void {
    const fragment = document.createDocumentFragment();
    const toyCardTemp: HTMLTemplateElement | null =
      document.querySelector('#toyCardTemp');
    let count = COUNT_FAVORITE.countMin;

    data.forEach((element) => {
      if (!toyCardTemp) return;

      const newsClone = toyCardTemp.content.cloneNode(true) as HTMLElement;

      const cardTitle = newsClone.querySelector(
        '.toy-card-title'
      ) as HTMLElement;
      cardTitle.textContent = element.name;

      const toyImage = newsClone.querySelector(
        '.toy-card-image'
      ) as HTMLImageElement;
      toyImage.src = `./assets/toys/${element.num}.png`;

      const toyCount = newsClone.querySelector(
        '.describe-content.count'
      ) as HTMLElement;
      toyCount.textContent = `Количество: ${element.count}`;

      const toyYear = newsClone.querySelector(
        '.describe-content.year'
      ) as HTMLElement;
      toyYear.textContent = `Год покупки: ${element.year}`;

      const toyShape = newsClone.querySelector(
        '.describe-content.shape'
      ) as HTMLElement;
      toyShape.textContent = `Форма: ${element.shape}`;

      const toyColor = newsClone.querySelector(
        '.describe-content.color'
      ) as HTMLElement;
      toyColor.textContent = `Цвет: ${element.color}`;

      const toySize = newsClone.querySelector(
        '.describe-content.size'
      ) as HTMLElement;
      toySize.textContent = `Размер: ${element.size}`;

      const toyFavorite = newsClone.querySelector(
        '.describe-content.favorite'
      ) as HTMLElement;
      toyFavorite.textContent = `Любимая: ${element.favorite ? 'Да' : 'Нет'}`;

      const cardToy = newsClone.querySelector('.toy-card') as HTMLElement;

      ATTRIBUTES.forEach((elem) => {
        setAttribute(cardToy, elem, element[elem]);
      });

      if (element.favorite) {
        count++;
        cardToy.classList.add('favorite-toy');
      }

      cardToy.addEventListener('click', (): void => {
        if (
          count === COUNT_FAVORITE.countMax &&
          !cardToy.classList.contains('favorite-toy')
        ) {
          const warning = cardToy.querySelector(
            '.toy-card-warning'
          ) as HTMLDivElement;

          warning.classList.remove('hide');
          setTimeout(() => {
            warning.classList.add('hide');
          }, DELAY.delayWarning);
        } else {
          cardToy.classList.toggle('favorite-toy');

          if (cardToy.classList.contains('favorite-toy')) {
            cardToy.setAttribute('data-favorite', IS_FAVORITE.true);
            toyFavorite.textContent = 'Любимая: Да';
            count++;
          } else {
            cardToy.setAttribute('data-favorite', IS_FAVORITE.false);
            toyFavorite.textContent = 'Любимая: Нет';
            count--;
          }

          const toysCount = document.querySelector(
            '.toys-count'
          ) as HTMLElement;
          toysCount.textContent = count.toString();
        }
      });

      fragment.append(newsClone);
    });

    const toyContainer = document.querySelector(
      '.toys-container'
    ) as HTMLElement;

    toyContainer.innerHTML = '';
    toyContainer.appendChild(fragment);

    const toysCount = document.querySelector('.toys-count') as HTMLElement;
    toysCount.textContent = count.toString();
  }
}
