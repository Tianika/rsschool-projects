import * as noUiSlider from 'nouislider';
import data from '../data/data';
import {
  IS_FAVORITE,
  SLIDER_VALUES,
  DEFAULT_STRING,
  VALUES_FOR_FILTER,
  ValuesFilter,
  Attributes,
} from './constants';
import { ICard, IValuesForFilter, ISaveValues } from './interfaces';

export function addAttribute(
  cardToy: ICard,
  attribute: string,
  valueAttribute: string | boolean
): void {
  if (typeof valueAttribute === 'string') {
    cardToy.setAttribute(`data-${attribute}`, valueAttribute);
  } else {
    cardToy.setAttribute(`data-${attribute}`, valueAttribute.toString());
  }
}

export function checkToyCard(values: IValuesForFilter): void {
  const cards: NodeListOf<ICard> = document.querySelectorAll('.toy-card');

  cards.forEach((card: ICard): void => checkFilter(card, values));
}

export function checkFilter(card: ICard, values: IValuesForFilter): void {
  showElement(card);

  const count: number = Number(card.dataset.count);
  const year: number = Number(card.dataset.year);

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

  const cards: NodeListOf<ICard> =
    toyContainer.querySelectorAll('.toy-card.visible');
  const warning: HTMLElement | null = document.querySelector('.warning-filter');

  if (cards.length === 0) {
    warning?.classList.remove('hide');
  } else {
    warning?.classList.add('hide');
  }
}

export function hideElement(card: ICard): void {
  card.classList.add('hidden');
  card.classList.remove('visible');
}

export function showElement(card: ICard): void {
  card.classList.remove('hidden');
  card.classList.add('visible');
}

export function resetSlider(
  countSlider: noUiSlider.target,
  yearSlider: noUiSlider.target
): void {
  countSlider.noUiSlider?.set([SLIDER_VALUES.countMin, SLIDER_VALUES.countMax]);
  yearSlider.noUiSlider?.set([SLIDER_VALUES.yearMin, SLIDER_VALUES.yearMax]);
}

export function resetSearch(
  searchInput: HTMLInputElement,
  clearSearchBtn: HTMLButtonElement
): void {
  searchInput.value = DEFAULT_STRING;
  clearSearchBtn.classList.add('hide');
}

export function resetValueForFilter(valuesForFilter: IValuesForFilter): void {
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

  checkboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.checked = false;
  });
}

export function addCheckboxSelection(saveValuesFilter: ISaveValues) {
  const settings = document.querySelector('.settings-container') as HTMLElement;
  const checkboxes = settings.querySelectorAll(
    'input'
  ) as NodeListOf<HTMLInputElement>;

  checkboxes.forEach((checkbox: HTMLInputElement): void => {
    const id = checkbox.id as ValuesFilter;
    const value = VALUES_FOR_FILTER[id];

    if (saveValuesFilter.shape.includes(value)) {
      checkbox.checked = true;
    }
    if (saveValuesFilter.color.includes(value)) {
      checkbox.checked = true;
    }
    if (saveValuesFilter.size.includes(value)) {
      checkbox.checked = true;
    }
    if (
      checkbox.id === Attributes.favorite &&
      saveValuesFilter.favorite === IS_FAVORITE.true
    ) {
      checkbox.checked = true;
    }
  });
}

export function addCountSliderValue(
  saveValuesFilter: ISaveValues,
  countSlider: noUiSlider.target
): void {
  countSlider.noUiSlider?.set([
    saveValuesFilter.count.min,
    saveValuesFilter.count.max,
  ]);
}

export function addYearSliderValue(
  saveValuesFilter: ISaveValues,
  yearSlider: noUiSlider.target
): void {
  yearSlider.noUiSlider?.set([
    saveValuesFilter.year.min,
    saveValuesFilter.year.max,
  ]);
}

export function addToyForPage(index: number): HTMLLIElement {
  const toyContainer = document.createElement('li');
  const toy = document.createElement('img');
  const amount = document.createElement('div');

  toyContainer.classList.add('choice-toy-item');

  amount.classList.add('toy-amount');
  amount.innerText = data[index].count;

  toy.classList.add('choice-toy-img');
  toy.alt = data[index].name;
  toy.draggable = true;
  toy.id = data[index].num;
  toy.src = `../assets/toys/${data[index].num}.png`;
  toy.setAttribute('data-toy', index.toString());

  toyContainer.appendChild(toy);
  toyContainer.appendChild(amount);

  return toyContainer;
}
