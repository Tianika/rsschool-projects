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
