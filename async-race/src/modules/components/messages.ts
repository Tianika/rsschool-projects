export const createWinnerMsg = (): HTMLElement => {
  const message = document.createElement('div');
  message.classList.add('winner-msg');

  message.innerHTML = `<span class="name-winner"></span> went first (<span class="time-winner"></span> sec)`;

  return message;
};

export const raceOverMsg = (): HTMLElement => {
  const message = document.createElement('div');
  message.classList.add('race-over');

  message.innerHTML = 'The race is over';

  return message;
};
