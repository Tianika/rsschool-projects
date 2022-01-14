import { createButton } from '.';
import { DATA_NAV_BTNS } from '../utils';

export const createNavigation = (): HTMLElement => {
  const nav = document.createElement('nav');
  nav.classList.add('navigation');

  DATA_NAV_BTNS.forEach((data) => {
    nav.appendChild(createButton(data));
  });

  return nav;
};
