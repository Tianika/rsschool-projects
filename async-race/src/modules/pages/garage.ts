import { createHeader, createFooter } from '../features';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;

  const fragment = document.createDocumentFragment();

  const header = createHeader();
  fragment.appendChild(header);

  const footer = createFooter();
  fragment.appendChild(footer);

  root.appendChild(fragment);
};
