import { createButton } from './button';

export const createNavigation = (): HTMLElement => {
  const nav = document.createElement('nav');
  nav.classList.add('.navigation');

  nav.appendChild(
    createButton(
      'To Garage',
      'toGarageBtn',
      () => (window.location.hash = '#garage')
    )
  );
  nav.appendChild(
    createButton(
      'To Winners',
      'toWinnersBtn',
      () => (window.location.hash = '#winners')
    )
  );

  return nav;
};
