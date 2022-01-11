export const DATA_NAV_BTNS = [
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

export const DATA_INPUTS = [
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

export const DATA_RACE_BTNS = [
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
