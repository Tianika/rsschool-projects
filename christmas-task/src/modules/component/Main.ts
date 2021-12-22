export const Main = (): DocumentFragment => {
  const component = ` 
    <div class="main-page-titte">Помогите бабушке украсить ёлку</div>
    <div class="main-page-link">
      <a href="#toys-page" class="link-button">Начать игру</a>
    </div>
    <div class="decoration-container left"></div>
    <div class="decoration-container right"></div>
  `;

  const fragment: DocumentFragment = document.createDocumentFragment();
  const main: HTMLElement = document.createElement('main');

  main.classList.add('main');
  main.innerHTML = component;

  fragment.appendChild(main);

  return fragment;
};

export default Main;
