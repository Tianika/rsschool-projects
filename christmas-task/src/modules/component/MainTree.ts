export const Main = (): DocumentFragment => {
  const component = ` 
  <div class="container">
    <div class="main-tree-settings">
      <div class="settings-buttons-container">
        <button class="button sound-button"></button>
        <button class="button snow-button"></button>
        <button class="button save-button"></button>
      </div>
      <div class="choice-tree-container">
        <h3 class="title choice-tree-title">Выберите ёлку</h3>
          <ul class="choice-tree">
          </ul>
      </div>
      <div class="choice-background-container">
        <h3 class="title choice-background-title">Выберите фон</h3>
          <ul class="choice-background">
          </ul>
      </div>
      <div class="choice-light-container">
        <h3 class="title choice-light-title">Гирлянда</h3>
          <ul class="choice-light">
            <li class="light different"></li>
            <li class="light silver"></li>
            <li class="light gold"></li>
            <li class="light red"></li>
            <li class="light green"></li>
            <li class="light blue"></li>
          </ul>
      </div>
    </div>
    <div class="tree-container">
      <img class="christmas-tree" src='./assets/tree/2.png' alt="Новогодняя ёлка" usemap="#treemap">
      <div class="shadow-tree"></div>
      <map name="treemap">
        <area shape="rect" coords="34,44,270,350" alt="Новогодняя ёлка">
      </map>
    </div>
    <div class="main-tree-toys">
      <div class="choice-toy-container">
        <h3 class="title choice-toy-title">Игрушки</h3>
        <ul class="choice-toy">
        </ul>
      </div>
      <div class="saving-tree-container">
        <h3 class="title saving-tree-title">Вы нарядили</h3>
          <ul class="choice-saving-tree">
          </ul>
      </div>
    </div>
  </div>
  `;

  const fragment: DocumentFragment = document.createDocumentFragment();
  const main: HTMLElement = document.createElement('main');

  main.classList.add('main');
  main.innerHTML = component;

  fragment.appendChild(main);

  return fragment;
};

export default Main;
