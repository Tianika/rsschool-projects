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

export type CheckWinner = ResultRace | undefined;

export type PromiseResult = Promise<void | ResultRace>;

export type PromiseRace = Promise<void | RaceStatus | undefined>;

export type CommonState = {
  pageGarage: number;
  pageWinners: number;
  limitGarage: number;
  limitWinners: number;
  countCars: number;
  promises: Array<PromiseResult>;
  animationIds: Array<number>;
  raceResult: Array<void | ResultRace>;
  winnersSortType: WinnersSortType;
  winnersSortOrder: WinnersSortOrder;
};
