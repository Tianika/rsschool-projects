import { createHeader } from '../features';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;

  const fragment = document.createDocumentFragment();

  const header = createHeader();

  fragment.appendChild(header);
  root.appendChild(fragment);
};
