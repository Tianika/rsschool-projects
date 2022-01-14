export type VoidFunction = () => void;

export type BtnData = {
  text: string;
  className: string;
  handler: VoidFunction;
};

export type InputData = {
  textInputClass: string;
  colorInputClass: string;
  btnData: BtnData;
  state: CarData;
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
