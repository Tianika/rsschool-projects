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
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(22deg)"></li>
          <li style="transform: translateY(8px) rotate(15deg)"></li>
          <li style="transform: translateY(10px)"></li>
          <li style="transform: translateY(8px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-22deg)"></li>
        </ul>
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(25deg)"></li>
          <li style="transform: translateY(10px) rotate(15deg)"></li>
          <li style="transform: translateY(18px) rotate(10deg)"></li>
          <li style="transform: translateY(20px)"></li>
          <li style="transform: translateY(18px) rotate(-10deg)"></li>
          <li style="transform: translateY(10px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-25deg)"></li>
        </ul>
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(25deg)"></li>
          <li style="transform: translateY(10px) rotate(15deg)"></li>
          <li style="transform: translateY(18px) rotate(10deg)"></li>
          <li style="transform: translateY(22px) rotate(5deg)"></li>
          <li style="transform: translateY(24px)"></li>
          <li style="transform: translateY(22px) rotate(-5deg)"></li>
          <li style="transform: translateY(18px) rotate(-10deg)"></li>
          <li style="transform: translateY(10px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-25deg)"></li>
        </ul>
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(25deg)"></li>
          <li style="transform: translateY(10px) rotate(15deg)"></li>
          <li style="transform: translateY(18px) rotate(10deg)"></li>
          <li style="transform: translateY(24px) rotate(5deg)"></li>
          <li style="transform: translateY(28px) rotate(3deg)"></li>
          <li style="transform: translateY(30px)"></li>
          <li style="transform: translateY(28px) rotate(-3deg)"></li>
          <li style="transform: translateY(24px) rotate(-5deg)"></li>
          <li style="transform: translateY(18px) rotate(-10deg)"></li>
          <li style="transform: translateY(10px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-25deg)"></li>
        </ul>
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(25deg)"></li>
          <li style="transform: translateY(10px) rotate(15deg)"></li>
          <li style="transform: translateY(18px) rotate(10deg)"></li>
          <li style="transform: translateY(24px) rotate(5deg)"></li>
          <li style="transform: translateY(28px) rotate(3deg)"></li>
          <li style="transform: translateY(30px) rotate(1deg)"></li>
          <li style="transform: translateY(32px)"></li>
          <li style="transform: translateY(30px) rotate(-1deg)"></li>
          <li style="transform: translateY(28px) rotate(-3deg)"></li>
          <li style="transform: translateY(24px) rotate(-5deg)"></li>
          <li style="transform: translateY(18px) rotate(-10deg)"></li>
          <li style="transform: translateY(10px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-25deg)"></li>
        </ul>
        <ul class="garland-item">
          <li style="transform: translateY(0px) rotate(25deg)"></li>
          <li style="transform: translateY(10px) rotate(15deg)"></li>
          <li style="transform: translateY(18px) rotate(10deg)"></li>
          <li style="transform: translateY(24px) rotate(5deg)"></li>
          <li style="transform: translateY(28px) rotate(3deg)"></li>
          <li style="transform: translateY(30px) rotate(1deg)"></li>
          <li style="transform: translateY(32px)"></li>
          <li style="transform: translateY(33px)"></li>
          <li style="transform: translateY(32px)"></li>
          <li style="transform: translateY(30px) rotate(-1deg)"></li>
          <li style="transform: translateY(28px) rotate(-3deg)"></li>
          <li style="transform: translateY(24px) rotate(-5deg)"></li>
          <li style="transform: translateY(18px) rotate(-10deg)"></li>
          <li style="transform: translateY(10px) rotate(-15deg)"></li>
          <li style="transform: translateY(0px) rotate(-25deg)"></li>
        </ul>
      </div>
      <div class="snowflake-container">
      </div>
      <map name="treemap">
        <area shape="poly" coords="10,549,240,4,265,5,484,555,412,662,257,683,99,659">
      </map>
      <img class="christmas-tree" draggable="false" src='./assets/tree/1.png' alt="Новогодняя ёлка" usemap="#treemap">
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
