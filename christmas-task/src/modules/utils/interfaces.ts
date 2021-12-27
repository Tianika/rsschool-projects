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

export interface IValuesForFilter {
  shape: Set<string>;
  color: Set<string>;
  size: Set<string>;
  favorite: string;
  count: {
    min: number;
    max: number;
  };
  year: {
    min: number;
    max: number;
  };
  search: Set<string>;
}

export type FavoriteToys = Set<string>;

export interface ISaveValues {
  shape: Array<string>;
  color: Array<string>;
  size: Array<string>;
  favorite: string;
  count: {
    min: number;
    max: number;
  };
  year: {
    min: number;
    max: number;
  };
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

export type Delay = {
  delayWarning: number;
  delayActive: number;
  delaySnow: number;
  delayDefault: number;
};

export interface IBackgroundSettings {
  tree: string;
  background: string;
}

export interface IDropIvent extends Event {
  clientX: number;
  clientY: number;
}
