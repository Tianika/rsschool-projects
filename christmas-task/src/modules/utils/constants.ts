import { Delay, SortIndex } from './interfaces';

export enum sortTypes {
  default = 'data-num',
  sortFromLetters = 'data-name',
  sortFromYear = 'data-year',
}

export enum IS_FAVORITE {
  false = 'false',
  true = 'true',
}

export enum FAVORITE {
  yes = 'Да',
  no = 'Нет',
}

export const SORT_INDEX: SortIndex = {
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

export const DELAY: Delay = {
  delayWarning: 1500,
  delayActive: 500,
  delaySnow: 100,
  delayDefault: 0,
};

export enum ValuesFilter {
  ball = 'ball',
  bell = 'bell',
  cone = 'cone',
  snowflake = 'snowflake',
  toy = 'toy',
  white = 'white',
  yellow = 'yellow',
  red = 'red',
  blue = 'blue',
  green = 'green',
  small = 'small',
  middle = 'middle',
  big = 'big',
}

export const VALUES_FOR_FILTER: Record<ValuesFilter, string> = {
  ball: 'шар',
  bell: 'колокольчик',
  cone: 'шишка',
  snowflake: 'снежинка',
  toy: 'фигурка',
  white: 'белый',
  yellow: 'желтый',
  red: 'красный',
  blue: 'синий',
  green: 'зелёный',
  small: 'малый',
  middle: 'средний',
  big: 'большой',
};

export enum Attributes {
  num = 'num',
  name = 'name',
  count = 'count',
  year = 'year',
  shape = 'shape',
  color = 'color',
  size = 'size',
  favorite = 'favorite',
}

export const NOT_FOUND: number = -1;

export const DEFAULT_STRING: string = '';

export enum HashIds {
  mainId = 'main-page',
  toysId = 'toys-page',
  treeId = 'tree-page',
}

export const DEFAULT_SOUND = 0;

export const TREES = ['1', '2', '3', '4', '5', '6'];

export const BACKGROUNDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const DEFAULT_VALUE_BG = '1';

export const DEFAULT_COLOR = 'different';

export const OFFSET = 1;

export const SOUND_PATHS = ['../../assets/audio/audio.mp3'];

export const EMPTY_LS = '[]';
