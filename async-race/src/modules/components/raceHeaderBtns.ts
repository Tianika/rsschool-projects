import { createButton } from '.';
import { BtnData, DATA_RACE_BTNS } from '../utils';

export const createRaceHeaderBtns = (): HTMLElement => {
  const div = document.createElement('div');
  div.classList.add('header-race-btn');

  DATA_RACE_BTNS.forEach((data: BtnData): void => {
    div.appendChild(createButton(data));
  });

  return div;
};
