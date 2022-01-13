import { createFooter, createHeader } from '../features';
import { DEFAULT_STRING } from '../utils';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;
  root.innerHTML = DEFAULT_STRING;

  const fragment = document.createDocumentFragment();

  const header = createHeader();
  fragment.appendChild(header);

  // const main = await garageMainCreate();
  // fragment.appendChild(main);

  const footer = createFooter();
  fragment.appendChild(footer);

  root.appendChild(fragment);
};
