import { BtnData, FooterData, InputData } from '.';

export const DATA_NAV_BTNS: Array<BtnData> = [
  {
    text: 'to garage',
    className: 'toGarageBtn',
    handler: () => (window.location.hash = '#garage'),
  },
  {
    text: 'to winners',
    className: 'toWinnersBtn',
    handler: () => (window.location.hash = '#winners'),
  },
];

export const DATA_INPUTS: Array<InputData> = [
  {
    textInputClass: 'input-create',
    colorInputClass: 'color-for-create',
    btnData: {
      text: 'create',
      className: 'create-button',
      handler: () => console.log('create'),
    },
  },
  {
    textInputClass: 'input-update',
    colorInputClass: 'color-for-update',
    btnData: {
      text: 'update',
      className: 'update-button',
      handler: () => console.log('update'),
    },
  },
];

export const DATA_RACE_BTNS: Array<BtnData> = [
  {
    text: 'race',
    className: 'raceBtn',
    handler: () => console.log('race'),
  },
  {
    text: 'reset',
    className: 'resetBtn',
    handler: () => console.log('reset'),
  },
  {
    text: 'generate cars',
    className: 'generateBtn',
    handler: () => console.log('generate cars'),
  },
];

export const DATA_FOOTER: FooterData = {
  year: '&copy; 2021',
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
