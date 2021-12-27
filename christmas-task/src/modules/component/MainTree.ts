export const Main = (): DocumentFragment => {
  const component = ` 
  <div class="container">
    <div class="main-tree-settings">
      <div class="settings-buttons-container">
        <button class="button sound-button"></button>
        <button class="button snow-button"></button>
        <button class="button save-button"></button>
        <button class="button reset-button"></button>
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
            <li class="light different" data-color="different"></li>
            <li class="light silver" data-color="silver"></li>
            <li class="light gold" data-color="gold"></li>
            <li class="light red" data-color="red"></li>
            <li class="light blue" data-color="blue"></li>
            <li class="light green" data-color="green"></li>
            <li class="power-button"></li>
          </ul>
      </div>
    </div>
    <div class="tree-container">
      <div class="shadow-tree"></div>
      <div class="garland-container">
      </div>
      <div class="snowflake-container">
      </div>
      <map name="treemap">
        <area shape="poly" coords="9,616,132,299,205,103,250,9,342,264,411,424,486,622,431,681,357,697,239,698,137,698,68,687">
      </map>
      <img class="christmas-tree" draggable="false" src='./assets/tree/1.png' alt="Новогодняя ёлка" usemap="#treemap">
      <div class="basket"></div>
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
