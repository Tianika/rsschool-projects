export const Header = () => {
  const component = ` 
        <div class="container">
          <div class="link-main-container">
            <a href="#" class="link-main"></a>
          </div>
          <div class="link-toys-container">
            <a href="#" class="link-toys">Игрушки</a>
          </div>
          <div class="link-trees-container">
            <a href="#" class="link-trees">Ёлка</a>
          </div>
          <div class="search-field">
            <input
              class="search-input"
              name="search"
              placeholder="Введите название"
              type="text"
              autofocus
              autocomplete="off"
            />
            <button class="clear-search hide"></button>
            <div class="toys-count-container">
              <div class="favorite-icon"></div>
              <div class="toys-count"></div>
            </div>
          </div>
        </div>
  `;

  const fragment = document.createDocumentFragment();
  const header = document.createElement('header');

  header.classList.add('header');
  header.innerHTML = component;

  fragment.appendChild(header);
  return fragment;
};

export default Header;
