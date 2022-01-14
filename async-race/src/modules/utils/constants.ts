import { BtnData, FooterData, InputData, renderCar } from './';
import { createInputState, updateInputState } from './states';

export const DEFAULT_STRING = '';

export const FIRST_INDEX = 1;

export enum Hashes {
  garage = 'garage',
  winners = 'winners',
}

export const DATA_NAV_BTNS: Array<BtnData> = [
  {
    text: 'to garage',
    className: 'garage-button',
    handler: (): string => (window.location.hash = `#${Hashes.garage}`),
  },
  {
    text: 'to winners',
    className: 'winners-button',
    handler: (): string => (window.location.hash = `#${Hashes.winners}`),
  },
];

export const DATA_INPUTS: Array<InputData> = [
  {
    textInputClass: 'input-create',
    colorInputClass: 'color-for-create',
    btnData: {
      text: 'create',
      className: 'create-button',
      handler: () => renderCar(),
    },
    state: createInputState,
  },
  {
    textInputClass: 'input-update',
    colorInputClass: 'color-for-update',
    btnData: {
      text: 'update',
      className: 'update-button',
      handler: () => console.log('update'),
    },
    state: updateInputState,
  },
];

export const DATA_RACE_BTNS: Array<BtnData> = [
  {
    text: 'race',
    className: 'race-button',
    handler: () => console.log('race'),
  },
  {
    text: 'reset',
    className: 'reset-button',
    handler: () => console.log('reset'),
  },
  {
    text: 'generate cars',
    className: 'generate-cars-button',
    handler: () => console.log('generate cars'),
  },
];

export const DATA_CAR_BTNS: Array<BtnData> = [
  {
    text: 'select',
    className: 'select-button',
    handler: () => console.log('select'),
  },
  {
    text: 'remove',
    className: 'remove-button',
    handler: () => console.log('remove'),
  },
];

export const DATA_ENGINE_BTNS: Array<BtnData> = [
  {
    text: 'A',
    className: 'start-button',
    handler: () => console.log('start'),
  },
  {
    text: 'B',
    className: 'stop-button',
    handler: () => console.log('stop'),
  },
];

export const DATA_FOOTER: FooterData = {
  year: '&copy; 2022',
  target: '_blank',
  author: {
    class: 'copyright-author',
    link: 'https://github.com/Tianika',
    text: 'Tianika',
  },
  school: {
    class: 'copyright-rsschool',
    link: 'https://rs.school/',
    text: '',
  },
};

export enum PageTitles {
  garage = 'Garage',
  winners = 'Winners',
}

export enum ResponceURLS {
  garage = 'http://127.0.0.1:3000/garage',
  winners = 'http://127.0.0.1:3000/winners',
}

export enum TableHeader {
  number = 'number',
  car = 'car',
  name = 'name',
  wins = 'wins',
  bestTime = 'bestTime',
}

export const TABLE_HEADER: Record<TableHeader, string> = {
  number: 'Number',
  car: 'Car',
  name: 'Name',
  wins: 'Wins',
  bestTime: 'Best time (seconds)',
};
