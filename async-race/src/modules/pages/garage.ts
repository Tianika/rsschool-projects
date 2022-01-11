import { createNavigation } from '../components';

export const draw = (): void => {
  const root = document.querySelector('.root') as HTMLElement;

  const fragment = document.createDocumentFragment();

  const nav = createNavigation();
  fragment.appendChild(nav);

  root.appendChild(fragment);
};
