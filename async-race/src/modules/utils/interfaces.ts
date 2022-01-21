import { WinnersSortOrder, WinnersSortType } from '.';

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
  id: string;
  time: string;
  wins: string;
};

export type UpdateWinner = {
  id: string;
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
  id: string;
};

export type DataRace = {
  velocity: number;
  distance: number;
};

export type RaceStatus = {
  success: boolean;
  id: string;
};

export type EventType = Event | undefined;

export type ResultRace = {
  id: string;
  timeRace: number;
};

export type DataForUpdateWinner = {
  wins: string;
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
  winnersSortType: WinnersSortType;
  winnersSortOrder: WinnersSortOrder;
  winnerData: null | ResultRace;
  isRace: boolean;
};
