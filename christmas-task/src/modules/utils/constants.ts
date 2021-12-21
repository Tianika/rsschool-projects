import { IValuesFilter } from './interfaces';

export enum sortTypes {
  default = 'data-num',
  sortFromLetters = 'data-name',
  sortFromYear = 'data-year',
}

export enum IS_FAVORITE {
  false = 'false',
  true = 'true',
}

export const SORT_INDEX = {
  default: 0,
};

export enum SLIDER_VALUES {
  countMin = 1,
  countMax = 12,
  countStep = 1,
  yearMin = 1940,
  yearMax = 2020,
  yearStep = 10,
  decimal = 10,
}

export enum COUNT_USER_FAVORITE {
  countMin = 0,
  countMax = 20,
}

export const DELAY = {
  delayWarning: 1500,
};

export const VALUES_FOR_FILTER = {
  ball: 'шар',
  bell: 'колокольчик',
  cone: 'шишка',
  snowflake: 'снежинка',
  toy: 'фигурка',
  'white-color': 'белый',
  'yellow-color': 'желтый',
  'red-color': 'красный',
  'blue-color': 'синий',
  'green-color': 'зелёный',
  'small-size': 'малый',
  'middle-size': 'средний',
  'big-size': 'большой',
};

export const ATTRIBUTES = [
  'num',
  'name',
  'count',
  'year',
  'shape',
  'color',
  'size',
  'favorite',
];

export const NOT_FOUND = -1;

export const DEFAULT_STRING = '';
