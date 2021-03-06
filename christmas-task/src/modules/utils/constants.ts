import { SortIndex, NumForSnow, SizeForCanvas } from './interfaces';

export enum SortTypes {
  default = 'data-num',
  sortFromLetters = 'data-name',
  sortFromYear = 'data-year',
}

export enum IsFavoriteToy {
  no = 'false',
  yes = 'true',
}

export enum Favorite {
  yes = 'Да',
  no = 'Нет',
}

export const SORT_INDEX: SortIndex = {
  default: 0,
};

export enum SliderValues {
  countMin = 1,
  countMax = 12,
  countStep = 1,
  yearMin = 1940,
  yearMax = 2020,
  yearStep = 10,
  decimal = 10,
}

export enum CountUserFavorite {
  countMin = 0,
  countMax = 20,
}

export enum Delay {
  warning = 1500,
  active = 500,
  snow = 100,
  default = 0,
}

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

export const NOT_FOUND = -1;

export const DEFAULT_STRING = '';

export enum HashIds {
  mainId = 'main-page',
  toysId = 'toys-page',
  treeId = 'tree-page',
}

export const DEFAULT_SOUND = 0;

export const TREES: string[] = ['1', '2', '3', '4', '5', '6'];

export const BACKGROUNDS: string[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

export const DEFAULT_VALUE_BG = '1';

export const DEFAULT_COLOR_FOR_GARLAND = 'different';

export const OFFSET = 1;

export enum SoundPaths {
  default = 'default',
}

export const SOUND_PATHS: Record<SoundPaths, string> = {
  [SoundPaths.default]: './assets/audio/audio.mp3',
};

export const EMPTY_LS = '[]';

export const NUM_FOR_SNOW: NumForSnow = {
  baseDuration: 4,
  offsetDuration: 2,
  multiplyForSec: 1000,
  baseSize: 15,
  baseOpacity: 0.2,
  offsetOpacity: 4,
  unitSize: 'px',
  unitTime: 's',
};

export const SIZE_FOR_CANVAS: SizeForCanvas = {
  size: '148px',
  borderRadius: '5px',
};
