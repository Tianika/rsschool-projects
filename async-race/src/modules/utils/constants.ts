import {
  changeUpdatedCar,
  driveCar,
  generateCars,
  nextCarPage,
  prevCarPage,
  removeCar,
  renderCar,
  resetRace,
  selectCar,
  startRace,
} from '../features';
import {
  BtnData,
  FooterData,
  InputData,
  createInputState,
  updateInputState,
} from '.';

export const DEFAULT_STRING = '';

export const enum Indexes {
  zero,
  one,
}

export const NUM_FOR_GENERATE = 100;

export enum Hashes {
  garage = 'garage',
  winners = 'winners',
}

export const DATA_NAV_BTNS: Array<BtnData> = [
  {
    text: 'to garage',
    className: 'garage-button',
    isActive: true,
    handler: (): string => (window.location.hash = `#${Hashes.garage}`),
  },
  {
    text: 'to winners',
    className: 'winners-button',
    isActive: true,
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
      isActive: true,
      handler: () => renderCar(),
    },
  },
  {
    textInputClass: 'input-update',
    colorInputClass: 'color-for-update',
    btnData: {
      text: 'update',
      className: 'update-button',
      isActive: false,
      handler: () => changeUpdatedCar(),
    },
  },
];

export const DATA_RACE_BTNS: Array<BtnData> = [
  {
    text: 'race',
    className: 'race-button',
    isActive: true,
    handler: () => startRace(),
  },
  {
    text: 'reset',
    className: 'reset-button',
    isActive: false,
    handler: () => resetRace(),
  },
  {
    text: 'generate cars',
    className: 'generate-cars-button',
    isActive: true,
    handler: () => generateCars(),
  },
];

export const DATA_PAGINATION_CARS_BTNS: Array<BtnData> = [
  {
    text: 'prev',
    className: 'prev-cars-button',
    isActive: false,
    handler: () => prevCarPage(),
  },
  {
    text: 'next',
    className: 'next-cars-button',
    isActive: false,
    handler: () => nextCarPage(),
  },
];

export const DATA_PAGINATION_WINNERS_BTNS: Array<BtnData> = [
  {
    text: 'prev',
    className: 'prev-winners-button',
    isActive: false,
    handler: () => console.log('prev'),
  },
  {
    text: 'next',
    className: 'next-winners-button',
    isActive: false,
    handler: () => console.log('next'),
  },
];

export const DATA_CAR_BTNS: Array<BtnData> = [
  {
    text: 'select',
    className: 'select-button',
    isActive: true,
    handler: (event?: Event) => selectCar(event),
  },
  {
    text: 'remove',
    className: 'remove-button',
    isActive: true,
    handler: (event?: Event) => removeCar(event),
  },
];

export const DATA_ENGINE_BTNS: Array<BtnData> = [
  {
    text: 'Start',
    className: 'start-button',
    isActive: true,
    handler: (event?: Event) => driveCar(event),
  },
  {
    text: 'Stop',
    className: 'stop-button',
    isActive: false,
    handler: (event?: Event) => console.log(event),
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
  engine = 'http://127.0.0.1:3000/engine',
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
  bestTime: 'Best time (sec)',
};

export const HEX_CODE: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];

export enum Delays {
  animBtn = 500,
}

export enum Positions {
  offset = 320,
  start = 0,
}
