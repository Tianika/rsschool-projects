import { dataToys } from '../utils/interfaces';
import {
  COUNT_USER_FAVORITE,
  DELAY,
  IS_FAVORITE,
  ATTRIBUTES,
} from '../utils/constants';
import { addAttribute } from '../utils/general';

export class ToyCard {
  draw(dataToys: Array<dataToys>): void {
    const fragment = document.createDocumentFragment();
    const toyCardTemp: HTMLTemplateElement | null =
      document.querySelector('#toyCardTemp');
    let count = COUNT_USER_FAVORITE.countMin;

    dataToys.forEach((toyData) => {
      if (!toyCardTemp) return;

      const newsClone = toyCardTemp.content.cloneNode(true) as HTMLElement;

      const cardTitle = newsClone.querySelector(
        '.toy-card-title'
      ) as HTMLElement;
      cardTitle.textContent = toyData.name;

      const toyImage = newsClone.querySelector(
        '.toy-card-image'
      ) as HTMLImageElement;
      toyImage.src = `./assets/toys/${toyData.num}.png`;

      const toyCount = newsClone.querySelector(
        '.describe-content.count'
      ) as HTMLElement;
      toyCount.textContent = `Количество: ${toyData.count}`;

      const toyYear = newsClone.querySelector(
        '.describe-content.year'
      ) as HTMLElement;
      toyYear.textContent = `Год покупки: ${toyData.year}`;

      const toyShape = newsClone.querySelector(
        '.describe-content.shape'
      ) as HTMLElement;
      toyShape.textContent = `Форма: ${toyData.shape}`;

      const toyColor = newsClone.querySelector(
        '.describe-content.color'
      ) as HTMLElement;
      toyColor.textContent = `Цвет: ${toyData.color}`;

      const toySize = newsClone.querySelector(
        '.describe-content.size'
      ) as HTMLElement;
      toySize.textContent = `Размер: ${toyData.size}`;

      const toyFavorite = newsClone.querySelector(
        '.describe-content.favorite'
      ) as HTMLElement;
      toyFavorite.textContent = `Любимая: ${toyData.favorite ? 'Да' : 'Нет'}`;

      const cardToy = newsClone.querySelector('.toy-card') as HTMLElement;
      cardToy.classList.add('visible');

      ATTRIBUTES.forEach((attribute) => {
        addAttribute(cardToy, attribute, toyData[attribute]);
      });

      cardToy.addEventListener('click', (): void => {
        if (
          count === COUNT_USER_FAVORITE.countMax &&
          !cardToy.classList.contains('user-favorite-toy')
        ) {
          const warning = cardToy.querySelector(
            '.toy-card-warning'
          ) as HTMLDivElement;

          warning.classList.remove('hide');
          setTimeout(() => {
            warning.classList.add('hide');
          }, DELAY.delayWarning);
        } else {
          cardToy.classList.toggle('user-favorite-toy');

          if (cardToy.classList.contains('user-favorite-toy')) {
            cardToy.setAttribute('data-user-favorite', IS_FAVORITE.true);
            count++;
          } else {
            cardToy.setAttribute('data-user-favorite', IS_FAVORITE.false);
            count--;
          }

          const toysCount = document.querySelector(
            '.toys-count'
          ) as HTMLElement;
          toysCount.textContent = count.toString();
        }
      });

      const warning = document.createElement('div');
      warning.innerText = 'Извините, совпадений не обнаружено';
      warning.classList.add('warning-filter');
      warning.classList.add('hide');

      fragment.append(warning);
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
