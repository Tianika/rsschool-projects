import { IS_FAVORITE, SLIDER_VALUES } from './constants';

export function addAttribute(
  cardToy: HTMLElement,
  attribute: string,
  valueAttribute: string | boolean
): void {
  if (typeof valueAttribute === 'string') {
    cardToy.setAttribute(`data-${attribute}`, valueAttribute);
  } else {
    cardToy.setAttribute(`data-${attribute}`, valueAttribute.toString());
  }
}

export function checkToyCard(values: any): void {
  const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.toy-card');

  cards.forEach((card) => checkFilter(card, values));
}

export function checkFilter(card: HTMLElement, values: any): void {
  card.classList.remove('hidden');
  card.classList.add('visible');

  const count = Number(card.dataset.count);
  const year = Number(card.dataset.year);

  if (+values.count.min > count || count > +values.count.max) {
    hideElement(card);
  }

  if (+values.year.min > year || year > +values.year.max) {
    hideElement(card);
  }

  if (values.shape.size > 0) {
    const shapeToy = card.dataset.shape;

    if (!values.shape.has(shapeToy)) {
      hideElement(card);
    }
  }

  if (values.color.size > 0) {
    const colorToy = card.dataset.color;

    if (!values.color.has(colorToy)) {
      hideElement(card);
    }
  }

  if (values.size.size > 0) {
    const sizeToy = card.dataset.size;

    if (!values.size.has(sizeToy)) {
      hideElement(card);
    }
  }

  if (values.favorite === IS_FAVORITE.true) {
    const favoriteToy = card.dataset.favorite;

    if (favoriteToy === IS_FAVORITE.false) {
      hideElement(card);
    }
  }
}

function hideElement(card) {
  card.classList.add('hidden');
  card.classList.remove('visible');
}
