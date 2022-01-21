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
  limitWinners: 10,
  countCars: 4,
  countWinners: 1,
  promises: [],
  animationIds: [],
  raceResult: [],
  winnersSortType: WinnersSortType.id,
  winnersSortOrder: WinnersSortOrder.asc,
  winnerData: null,
  isRace: false,
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
