import { createHeader, createFooter, garageMainCreate } from '../features';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;

  const fragment = document.createDocumentFragment();

  const header = createHeader();
  fragment.appendChild(header);

  const main = garageMainCreate();
  fragment.appendChild(main);

  const footer = createFooter();
  fragment.appendChild(footer);

  root.appendChild(fragment);
};
