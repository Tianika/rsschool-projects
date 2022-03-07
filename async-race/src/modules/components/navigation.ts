import { createButton } from '.';
import { BtnData, DATA_NAV_BTNS } from '../utils';

export const createNavigation = (): HTMLElement => {
  const nav = document.createElement('nav');
  nav.classList.add('navigation');

  DATA_NAV_BTNS.forEach((data: BtnData): void => {
    nav.appendChild(createButton(data));
  });

  return nav;
};
