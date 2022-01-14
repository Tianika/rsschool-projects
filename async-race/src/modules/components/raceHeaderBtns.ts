import { createButton } from '.';
import { DATA_RACE_BTNS } from '../utils';

export const createRaceHeaderBtns = (): HTMLElement => {
  const div = document.createElement('div');
  div.classList.add('header-race-btn');

  DATA_RACE_BTNS.forEach((data) => {
    div.appendChild(createButton(data));
  });

  return div;
};
