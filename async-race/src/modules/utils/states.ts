import { CarData } from '.';

export const commonState = {
  pageGarage: 1,
  pageWinners: 1,
  limitGarage: 7,
  limitWinners: 7,
  countCars: 4,
};

export const createInputState: CarData = {
  name: '',
  color: '#ffffff',
};

export const updateInputState: CarData = {
  name: '',
  color: '#ffffff',
};
