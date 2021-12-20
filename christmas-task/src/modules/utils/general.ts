import {
  IS_FAVORITE,
  SLIDER_VALUES,
  DEFAULT_STRING,
  VALUES_FOR_FILTER,
} from './constants';

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
  showElement(card);

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

  if (values.search.size > 0) {
    const numCard = card.dataset.num;

    if (values.search.has(numCard)) {
      hideElement(card);
    }
  }

  const toyContainer = document.querySelector('.toys-container') as HTMLElement;

  const cards: NodeListOf<Element> =
    toyContainer.querySelectorAll('.toy-card.visible');
  const warning: HTMLElement | null = document.querySelector('.warning-filter');

  if (cards.length === 0) {
    warning?.classList.remove('hide');
  } else {
    warning?.classList.add('hide');
  }
}

export function hideElement(card) {
  card.classList.add('hidden');
  card.classList.remove('visible');
}

export function showElement(card) {
  card.classList.remove('hidden');
  card.classList.add('visible');
}

export function resetSlider(countSlider, yearSlider) {
  countSlider.noUiSlider?.set([SLIDER_VALUES.countMin, SLIDER_VALUES.countMax]);
  yearSlider.noUiSlider?.set([SLIDER_VALUES.yearMin, SLIDER_VALUES.yearMax]);
}

export function resetSearch(searchInput, clearSearchBtn) {
  searchInput.value = DEFAULT_STRING;
  clearSearchBtn.classList.add('hide');
}

export function resetValueForFilter(valuesForFilter) {
  valuesForFilter.shape.clear();
  valuesForFilter.color.clear();
  valuesForFilter.size.clear();
  valuesForFilter.favorite = IS_FAVORITE.false;
  valuesForFilter.count.min = SLIDER_VALUES.countMin;
  valuesForFilter.count.max = SLIDER_VALUES.countMax;
  valuesForFilter.year.min = SLIDER_VALUES.yearMin;
  valuesForFilter.year.max = SLIDER_VALUES.yearMax;
  valuesForFilter.search.clear();
}

export function resetCheckboxes() {
  const settings = document.querySelector('.settings-container') as HTMLElement;
  const checkboxes = settings.querySelectorAll(
    'input'
  ) as NodeListOf<HTMLInputElement>;

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

export function addCheckboxSelection(saveValuesFilter) {
  const settings = document.querySelector('.settings-container') as HTMLElement;
  const checkboxes = settings.querySelectorAll(
    'input'
  ) as NodeListOf<HTMLInputElement>;

  checkboxes.forEach((checkbox) => {
    if (saveValuesFilter.shape.includes(VALUES_FOR_FILTER[checkbox.id])) {
      checkbox.checked = true;
    }
    if (saveValuesFilter.color.includes(VALUES_FOR_FILTER[checkbox.id])) {
      checkbox.checked = true;
    }
    if (saveValuesFilter.size.includes(VALUES_FOR_FILTER[checkbox.id])) {
      checkbox.checked = true;
    }
    if (
      checkbox.id === 'favorite' &&
      saveValuesFilter.favorite === IS_FAVORITE.true
    ) {
      checkbox.checked = true;
    }
  });
}

export function addSliderValue(countSlider, yearSlider, saveValuesFilter) {
  countSlider.noUiSlider?.set([
    saveValuesFilter.count.min,
    saveValuesFilter.count.max,
  ]);
  yearSlider.noUiSlider?.set([
    saveValuesFilter.year.min,
    saveValuesFilter.year.max,
  ]);
}
