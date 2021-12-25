import {
  IDataToys,
  ICard,
  FavoriteToys,
  COUNT_USER_FAVORITE,
  DELAY,
  IS_FAVORITE,
  FAVORITE,
  Attributes,
  DEFAULT_STRING,
  addAttribute,
} from '../utils';

export class ToyCard {
  favoriteToys: FavoriteToys;

  constructor() {
    this.favoriteToys = new Set();
  }

  draw(dataToys: Array<IDataToys>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const toyCardTemp: HTMLTemplateElement | null =
      document.querySelector('#toyCardTemp');
    let count: number = COUNT_USER_FAVORITE.countMin;

    if (localStorage.favoriteForChristmasGame) {
      count = JSON.parse(localStorage.favoriteForChristmasGame).length;
    }

    dataToys.forEach((toyData: IDataToys): void => {
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
      toyFavorite.textContent = `Любимая: ${
        toyData.favorite ? FAVORITE.yes : FAVORITE.no
      }`;

      const cardToy = newsClone.querySelector('.toy-card') as ICard;
      cardToy.classList.add('visible');

      Object.values(Attributes).forEach((attribute: Attributes): void => {
        const valueAttribute: string | boolean = toyData[attribute];

        addAttribute(cardToy, attribute, valueAttribute);
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
            this.favoriteToys.add(cardToy.dataset.num);
            count++;
            this.saveFavoriteToys();
          } else {
            cardToy.setAttribute('data-user-favorite', IS_FAVORITE.false);
            this.favoriteToys.delete(cardToy.dataset.num);
            count--;
            this.saveFavoriteToys();
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

    toyContainer.innerHTML = DEFAULT_STRING;
    toyContainer.appendChild(fragment);

    const toysCount = document.querySelector('.toys-count') as HTMLElement;
    toysCount.textContent = count.toString();

    if (localStorage.favoriteForChristmasGame) {
      this.loadFavoriteToys();
    }
  }

  saveFavoriteToys() {
    const userFavoriteToys: Array<string> = [...this.favoriteToys];
    localStorage.favoriteForChristmasGame = JSON.stringify(userFavoriteToys);
  }

  loadFavoriteToys() {
    if (localStorage.favoriteForChristmasGame) {
      const userFavoriteToys: Array<string> = JSON.parse(
        localStorage.favoriteForChristmasGame
      );
      const count = userFavoriteToys.length;

      if (userFavoriteToys.length > COUNT_USER_FAVORITE.countMin) {
        userFavoriteToys.forEach((toy: string): void => {
          this.favoriteToys.add(toy);
        });
      }

      if (userFavoriteToys.length > COUNT_USER_FAVORITE.countMin) {
        const cards = document.querySelectorAll(
          '.toy-card'
        ) as NodeListOf<ICard>;
        const toysCount = document.querySelector('.toys-count') as HTMLElement;

        toysCount.innerText = count.toString();

        cards.forEach((card: ICard): void => {
          if (userFavoriteToys.includes(card.dataset.num)) {
            card.classList.add('user-favorite-toy');
          }
        });
      }
    }
  }
}

export default ToyCard;
