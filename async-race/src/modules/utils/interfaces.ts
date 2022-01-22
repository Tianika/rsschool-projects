export type HandlerFunction = (event: Event | undefined) => void;

export type BtnData = {
  text: string;
  className: string;
  isActive: boolean;
  handler: HandlerFunction;
};

export type InputData = {
  textInputClass: string;
  colorInputClass: string;
  btnData: BtnData;
};

export type LinkData = {
  class: string;
  link: string;
  text: string;
};

export type FooterData = {
  year: string;
  target: string;
  author: LinkData;
  school: LinkData;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  id: number;
  time: number;
  wins: number;
};

export type UpdateWinner = {
  id: number;
  time: number;
  wins: number;
};

export type CarData = {
  name: string;
  color: string;
};

export type CarDataForUpdate = {
  name: string;
  color: string;
  id: number;
};

export type DataRace = {
  velocity: number;
  distance: number;
};

export type RaceStatus = {
  success: boolean;
  id: number;
};

export type EventType = Event | undefined;

export type ResultRace = {
  id: number;
  timeRace: number;
};

export type DataForUpdateWinner = {
  wins: number;
  time: number;
};

export type CheckWinner = ResultRace | undefined;

export type PromiseRaceResolve = void | ResultRace;

export type PromiseResult = Promise<PromiseRaceResolve>;

export type PromiseRace = Promise<void | RaceStatus | undefined>;

export type CommonState = {
  pageGarage: number;
  pageWinners: number;
  limitGarage: number;
  limitWinners: number;
  countCars: number;
  countWinners: number;
  promises: Array<PromiseResult>;
  animationIds: Array<number>;
  raceResult: Array<PromiseRaceResolve>;
  winnersSortType: string;
  winnersSortOrder: string;
  winnerData: null | ResultRace;
  isRace: boolean;
};
