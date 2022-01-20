import {
  CarData,
  CarDataForUpdate,
  CommonState,
  WinnersSortOrder,
  WinnersSortType,
} from '.';

export const commonState: CommonState = {
  pageGarage: 1,
  pageWinners: 1,
  limitGarage: 7,
  limitWinners: 7,
  countCars: 4,
  promises: [],
  animationIds: [],
  raceResult: [],
  winnersSortType: WinnersSortType.id,
  winnersSortOrder: WinnersSortOrder.asc,
};

export const createInputState: CarData = {
  name: '',
  color: '#ffffff',
};

export const updateInputState: CarDataForUpdate = {
  name: '',
  color: '#ffffff',
  id: '',
};
