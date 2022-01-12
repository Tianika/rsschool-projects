import { createInputBlock, createNavigation, createRaceHeaderBtns } from '.';

export const createHeader = (): HTMLElement => {
  const header = document.createElement('header');
  header.classList.add('header');

  const nav = createNavigation();
  header.appendChild(nav);

  const inputBlock = createInputBlock();
  header.appendChild(inputBlock);

  const headerRaceBtns = createRaceHeaderBtns();
  header.appendChild(headerRaceBtns);

  return header;
};
