const MainToys = (): DocumentFragment => {
  const component = ` 
  <div class="container">
    <div class="settings-container">
      <div class="settings-toy left">
        <h3 class="title shape-title">Форма</h3>
        <div class="shape-choice">
          <div class="checkbox-item">
            <input type="checkbox" class="shape-choice-item ball-choice-item" id="ball">
            <label for="ball"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="shape-choice-item bell-choice-item" id="bell">
            <label for="bell"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="shape-choice-item cone-choice-item" id="cone">
            <label for="cone"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="shape-choice-item snowflake-choice-item" id="snowflake">
            <label for="snowflake"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="shape-choice-item toy-choice-item" id="toy">
            <label for="toy"></label>
          </div>
        </div>
        <h3 class="title color-title">Цвет</h3>
        <div class="color-choice">
          <div class="checkbox-item">
            <input type="checkbox" class="color-choice-item white-choice-item" id="white">
            <label for="white-color"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="color-choice-item yellow-choice-item" id="yellow">
            <label for="yellow-color"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="color-choice-item red-choice-item" id="red">
            <label for="red-color"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="color-choice-item blue-choice-item" id="blue">
            <label for="blue-color"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="color-choice-item green-choice-item" id="green">
            <label for="green-color"></label>
          </div>
        </div>
        <h3 class="title size-title">Размер</h3>
        <div class="size-choice">
          <div class="checkbox-item">
            <input type="checkbox" class="size-choice-item small-choice-item" id="small">
            <label for="small-size"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="size-choice-item middle-choice-item" id="middle">
            <label for="middle-size"></label>
          </div>
          <div class="checkbox-item">
            <input type="checkbox" class="size-choice-item big-choice-item" id="big">
            <label for="big-size"></label>
          </div>
        </div>
        <h3 class="title favorite-title">Только любимые</h3>
        <div class="favorite-choice">
          <input type="checkbox" class="favorite-choice-item" id="favorite">
          <label for="favorite"></label>
        </div>
      </div>
      <div class="settings-toy right">
        <h3 class="title count-title">Количество экземпляров</h3>
        <div class="count-slider-container">
          <div class="counts count-slider-min">1</div>
          <div id="count-slider"></div>
          <div class="counts count-slider-max">12</div>
        </div>
        <h3 class="title year-title">Год приобретения</h3>
        <div class="year-slider-container">
          <div class="counts year-slider-min">1950</div>
          <div id="year-slider"></div>
          <div class="counts year-slider-max">2020</div>
        </div>              
        <h3 class="title sort-title">Сортировка</h3>
        <select class="sort-choice">
          <option class="sort-choice-item">По-умолчанию</option>
          <option class="sort-choice-item">От "А" до "Я"</option>
          <option class="sort-choice-item">От "Я" до "А"</option>
          <option class="sort-choice-item">Сначала новые</option>
          <option class="sort-choice-item">Сначала старые</option>
        </select>
        <button class="reset-filter-button">Сбросить фильтры</button>
        <button class="default-settings-button">Сбросить настройки</button>
      </div>
      <div class="warning-filter hide">Извините, совпадений не обнаружено</div> 
    </div>
    <div class="toys-container">
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

export default MainToys;
