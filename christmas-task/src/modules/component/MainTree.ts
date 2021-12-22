export const Main = (): DocumentFragment => {
  const component = ` 
    Ёлка
  `;

  const fragment: DocumentFragment = document.createDocumentFragment();
  const main: HTMLElement = document.createElement('main');

  main.classList.add('main');
  main.innerHTML = component;

  fragment.appendChild(main);

  return fragment;
};

export default Main;
