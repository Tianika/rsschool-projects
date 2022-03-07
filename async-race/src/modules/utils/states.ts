import { CarData, CarDataForUpdate, CommonState, PATH_TO_AUDIO } from '.';

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
  winnersSortType: 'id',
  winnersSortOrder: 'ASC',
  winnerData: null,
  isRace: false,
  audio: new Audio(PATH_TO_AUDIO),
  audioIsPlay: false,
};

export const createInputState: CarData = {
  name: '',
  color: '#ffffff',
};

export const updateInputState: CarDataForUpdate = {
  name: '',
  color: '#ffffff',
  id: 0,
};
