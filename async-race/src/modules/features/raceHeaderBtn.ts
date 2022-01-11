import { createButton } from '../components';
import { DATA_RACE_BTNS } from '../utiles';

export const createRaceHeaderBtn = (): HTMLElement => {
  const div = document.createElement('div');
  div.classList.add('header-race-btn');

  DATA_RACE_BTNS.forEach((data) => {
    div.appendChild(createButton(data));
  });

  return div;
};
