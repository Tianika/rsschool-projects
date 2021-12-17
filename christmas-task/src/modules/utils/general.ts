export function setAttribute(
  cardToy: HTMLElement,
  elem: string,
  value: string | boolean
): void {
  if (typeof value === 'string') {
    cardToy.setAttribute(`data-${elem}`, value);
  } else {
    cardToy.setAttribute(`data-${elem}`, value.toString());
  }
}

export function checkFilter(card: HTMLElement, values: any): void {
  card.classList.remove('hidden');
  card.classList.add('visible');

  if (values.shape.size > 0) {
    const shapeToy = card.dataset.shape;

    if (!values.shape.has(shapeToy)) {
      card.classList.add('hidden');
      card.classList.remove('visible');
    }
  }

  if (values.color.size > 0) {
    const colorToy = card.dataset.color;

    if (!values.color.has(colorToy)) {
      card.classList.add('hidden');
      card.classList.remove('visible');
    }
  }

  if (values.size.size > 0) {
    const sizeToy = card.dataset.size;

    if (!values.size.has(sizeToy)) {
      card.classList.add('hidden');
      card.classList.remove('visible');
    }
  }

  if (values.favorite === 'true') {
    const favoriteToy = card.dataset.favorite;

    if (favoriteToy === 'false') {
      card.classList.add('hidden');
      card.classList.remove('visible');
    }
  }
}
