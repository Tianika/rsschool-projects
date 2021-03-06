import * as noUiSlider from 'nouislider';
import data from '../data';
import {
  IsFavoriteToy,
  SliderValues,
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
  cardToy.setAttribute(`data-${attribute}`, valueAttribute.toString());
}

export function checkToyCard(values: IValuesForFilter): void {
  const cards: NodeListOf<ICard> = document.querySelectorAll('.toy-card');

  cards.forEach((card: ICard): void => checkFilter(card, values));
}

export function checkFilter(card: ICard, values: IValuesForFilter): void {
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

  if (values.favorite === IsFavoriteToy.yes) {
    const favoriteToy = card.dataset.favorite;

    if (favoriteToy === IsFavoriteToy.no) {
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
  countSlider.noUiSlider?.set([SliderValues.countMin, SliderValues.countMax]);
  yearSlider.noUiSlider?.set([SliderValues.yearMin, SliderValues.yearMax]);
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
  valuesForFilter.favorite = IsFavoriteToy.no;
  valuesForFilter.count.min = SliderValues.countMin;
  valuesForFilter.count.max = SliderValues.countMax;
  valuesForFilter.year.min = SliderValues.yearMin;
  valuesForFilter.year.max = SliderValues.yearMax;
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
      saveValuesFilter.favorite === IsFavoriteToy.yes
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
  const countToys = +data[index].count;

  const amount = document.createElement('div');

  amount.classList.add('toy-amount');
  amount.innerText = data[index].count;
  toyContainer.appendChild(amount);

  for (let i = 0; i < countToys; i++) {
    const toy = document.createElement('img');

    toy.classList.add('choice-toy-img');
    toy.alt = data[index].name;
    toy.draggable = true;
    toy.dataset.id = data[index].num;
    toy.src = `./assets/toys/${data[index].num}.png`;

    toyContainer.appendChild(toy);
  }

  toyContainer.classList.add('choice-toy-item');
  toyContainer.dataset.id = data[index].num;

  return toyContainer;
}
