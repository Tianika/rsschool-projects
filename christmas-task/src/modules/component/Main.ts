export const Main = (): DocumentFragment => {
  const component = ` 
        Укрась елку
  `;

  const fragment: DocumentFragment = document.createDocumentFragment();
  const main: HTMLElement = document.createElement('main');

  main.classList.add('header');
  main.innerHTML = component;

  fragment.appendChild(main);

  return fragment;
};

export default Main;
