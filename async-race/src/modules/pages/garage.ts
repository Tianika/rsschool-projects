import { createInputBlock, createNavigation } from '../features';
import { createRaceHeaderBtn } from '../features/raceHeaderBtn';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;

  const fragment = document.createDocumentFragment();

  const header = document.createElement('header');
  header.classList.add('header');

  const nav = createNavigation();
  header.appendChild(nav);

  const inputBlock = createInputBlock();
  header.appendChild(inputBlock);

  const headerRaceBtns = createRaceHeaderBtn();
  header.appendChild(headerRaceBtns);

  fragment.appendChild(header);
  root.appendChild(fragment);
};
