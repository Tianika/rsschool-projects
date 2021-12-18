export interface dataToys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export enum sortTypes {
  default = 'data-num',
  sortFromLetters = 'data-name',
  sortFromYear = 'data-year',
}
