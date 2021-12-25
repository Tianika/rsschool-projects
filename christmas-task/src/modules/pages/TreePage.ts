import { Header, MainTree, Footer, Buttons, Garland } from '../component';
import {
  DEFAULT_STRING,
  COUNT_USER_FAVORITE,
  TREES,
  BACKGROUNDS,
  DELAY,
  IBackgroundSettings,
  DEFAULT_VALUE_BG,
} from '../utils';
import { addToyForPage } from '../utils';

export class MainPage {
  settings: IBackgroundSettings;

  constructor() {
    this.settings = {
      tree: DEFAULT_VALUE_BG,
      background: DEFAULT_VALUE_BG,
    };
  }

  draw(): void {
    const header: DocumentFragment = Header();
    const main: DocumentFragment = MainTree();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;
    root.innerHTML = DEFAULT_STRING;

    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);

    const mainElem = document.querySelector('.main') as HTMLElement;
    const headerElem = document.querySelector('.header') as HTMLElement;

    mainElem.classList.add('main-tree');
    headerElem.classList.add('header-tree');

    const buttons: Buttons = new Buttons();

    buttons.playSound();
    buttons.drawSnowflakes();

    this.addTrees();
    this.addBackgrounds();
    this.addToys();

    const garland: Garland = new Garland();
    garland.draw();

    const treeConrainer = document.querySelector(
      '.tree-container'
    ) as HTMLElement;
    const christmasTree = document.querySelector(
      '.christmas-tree'
    ) as HTMLImageElement;

    if (localStorage.settingsBgForTreePage) {
      const settings = JSON.parse(localStorage.settingsBgForTreePage);
      this.settings.tree = settings.tree;
      this.settings.background = settings.background;

      treeConrainer.style.backgroundImage = `url(../assets/bg/${this.settings.background}.jpg)`;
      christmasTree.src = `../assets/tree/${this.settings.tree}.png`;
    }

    const resetBtn = document.querySelector(
      '.reset-button'
    ) as HTMLButtonElement;

    resetBtn.addEventListener('click', (): void => {
      buttons.resetSettings();
      resetBtn.classList.add('active');

      setTimeout(() => {
        resetBtn.classList.remove('active');
      }, DELAY.delayActive);

      delete localStorage.settingsForTreePage;
      delete localStorage.settingsBgForTreePage;

      treeConrainer.style.backgroundImage = `url(../assets/bg/${this.settings.background}.jpg)`;
      christmasTree.src = `../assets/tree/${this.settings.tree}.png`;

      treeConrainer.style.backgroundImage = `url(../assets/bg/${DEFAULT_VALUE_BG}.jpg)`;
      christmasTree.src = `../assets/tree/${DEFAULT_VALUE_BG}.png`;

      this.settings.tree = DEFAULT_VALUE_BG;
      this.settings.background = DEFAULT_VALUE_BG;
    });
  }

  addTrees() {
    const treesConrainer = document.querySelector(
      '.choice-tree'
    ) as HTMLElement;

    TREES.forEach((item: string): void => {
      const tree = document.createElement('li');

      tree.classList.add('tree');
      tree.style.backgroundImage = `url(../assets/tree/${item}.png)`;
      tree.setAttribute('data-tree', item);

      treesConrainer.appendChild(tree);
    });

    const christmasTree = document.querySelector(
      '.christmas-tree'
    ) as HTMLImageElement;

    treesConrainer.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('tree')) {
        const number = target.dataset.tree;

        if (!number) return;

        this.settings.tree = number;
        christmasTree.src = `../assets/tree/${number}.png`;

        localStorage.settingsBgForTreePage = JSON.stringify(this.settings);
      }
    });
  }

  addBackgrounds() {
    const backgroundsConrainer = document.querySelector(
      '.choice-background'
    ) as HTMLElement;

    BACKGROUNDS.forEach((item: string): void => {
      const background = document.createElement('li');

      background.classList.add('background');
      background.style.backgroundImage = `url(../assets/bg/${item}.jpg)`;
      background.setAttribute('data-background', item);

      backgroundsConrainer.appendChild(background);
    });

    const treeContainer = document.querySelector(
      '.tree-container'
    ) as HTMLImageElement;

    backgroundsConrainer.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('background')) {
        const number = target.dataset.background;

        if (!number) return;

        treeContainer.style.backgroundImage = `url(../assets/bg/${number}.jpg)`;

        this.settings.background = number;
        localStorage.settingsBgForTreePage = JSON.stringify(this.settings);
      }
    });
  }

  addToys() {
    const toysConrainer = document.querySelector('.choice-toy') as HTMLElement;
    let favoriteToys: Array<string>;
    const fragment = document.createDocumentFragment();

    if (localStorage.favoriteForChristmasGame) {
      favoriteToys = JSON.parse(localStorage.favoriteForChristmasGame);

      for (let i = COUNT_USER_FAVORITE.countMin; i < favoriteToys.length; i++) {
        const toy = addToyForPage(+favoriteToys[i]);

        fragment.appendChild(toy);
      }
    } else {
      for (
        let i = COUNT_USER_FAVORITE.countMin;
        i < COUNT_USER_FAVORITE.countMax;
        i++
      ) {
        const toy = addToyForPage(i);

        fragment.appendChild(toy);
      }
    }

    toysConrainer.appendChild(fragment);
  }
}

export default MainPage;
