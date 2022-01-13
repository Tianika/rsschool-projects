import { createFooter, createNavigation, winnersMainCreate } from '../features';
import { DEFAULT_STRING } from '../utils';

export const draw = async (): Promise<void> => {
  const root = document.querySelector('.root') as HTMLElement;
  root.innerHTML = DEFAULT_STRING;

  const fragment = document.createDocumentFragment();

  const header = document.createElement('header');
  header.classList.add('header');
  header.appendChild(createNavigation());
  fragment.appendChild(header);

  const main = await winnersMainCreate();
  fragment.appendChild(main);

  const footer = createFooter();
  fragment.appendChild(footer);

  root.appendChild(fragment);
};
