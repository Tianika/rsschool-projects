export interface IDataToys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

type RangeOfNumbers = {
  min: number;
  max: number;
};

export interface IValuesForFilter {
  shape: Set<string>;
  color: Set<string>;
  size: Set<string>;
  favorite: string;
  count: RangeOfNumbers;
  year: RangeOfNumbers;
  search: Set<string>;
}

export type FavoriteToys = Set<string>;

export interface ISaveValues {
  shape: Array<string>;
  color: Array<string>;
  size: Array<string>;
  favorite: string;
  count: RangeOfNumbers;
  year: RangeOfNumbers;
  search: Array<string>;
  sort: number;
}

export interface ICard extends HTMLElement {
  dataset: {
    num: string;
    shape: string;
    color: string;
    count: string;
    year: string;
    size: string;
    name: string;
    favorite: string;
  };
}

export type typeForSortFunc = string | number | undefined;

export type sortValue = string | null | undefined;

export type SortIndex = { default: number };

export interface IBackgroundSettings {
  tree: string;
  background: string;
}

export interface IDropIvent extends Event {
  clientX: number;
  clientY: number;
}

export type NumForSnow = {
  baseDuration: number;
  offsetDuration: number;
  multiplyForSec: number;
  baseSize: number;
  baseOpacity: number;
  offsetOpacity: number;
  unitSize: string;
  unitTime: string;
};

export type SizeForCanvas = {
  size: string;
  borderRadius: string;
};
