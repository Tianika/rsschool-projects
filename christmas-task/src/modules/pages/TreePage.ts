import html2canvas from 'html2canvas';
import {
  Header,
  MainTree,
  Footer,
  Garland,
  Snowflakes,
  DragAndDrop,
} from '../component';
import {
  DEFAULT_STRING,
  CountUserFavorite,
  TREES,
  BACKGROUNDS,
  Delay,
  IBackgroundSettings,
  DEFAULT_VALUE_BG,
  OFFSET,
  EMPTY_LS,
  SIZE_FOR_CANVAS,
  addToyForPage,
} from '../utils';

class TreePage {
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

    this.addTrees();
    this.addBackgrounds();
    this.addToys();

    const snowflakes = new Snowflakes();
    snowflakes.drawSnowflakes();

    const garland = new Garland();
    garland.draw();

    const dragAndDrop = new DragAndDrop();
    dragAndDrop.draw();

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

      treeConrainer.style.backgroundImage = `url(./assets/bg/${this.settings.background}.jpg)`;
      christmasTree.src = `./assets/tree/${this.settings.tree}.png`;
    }

    const resetBtn = document.querySelector(
      '.reset-button'
    ) as HTMLButtonElement;

    resetBtn.addEventListener('click', (): void => {
      resetBtn.classList.add('active');

      setTimeout((): void => {
        resetBtn.classList.remove('active');
      }, Delay.active);

      delete localStorage.isSoundForTreePag;
      delete localStorage.isSnowForTreePage;
      delete localStorage.settingsBgForTreePage;
      delete localStorage.colorGarlandForChristmasTask;

      snowflakes.snowOff();

      const powerBtn = document.querySelector('.power-button') as HTMLElement;
      const lights = document.querySelectorAll(
        '.garland-item li'
      ) as NodeListOf<HTMLElement>;

      garland.garlandOff(powerBtn, lights);

      treeConrainer.style.backgroundImage = `url(./assets/bg/${DEFAULT_VALUE_BG}.jpg)`;
      christmasTree.src = `./assets/tree/${DEFAULT_VALUE_BG}.png`;

      this.settings.tree = DEFAULT_VALUE_BG;
      this.settings.background = DEFAULT_VALUE_BG;
    });

    const saveBtn = document.querySelector('.save-button') as HTMLElement;

    saveBtn.addEventListener('click', (): void => {
      this.saveTree();
      saveBtn.classList.add('active');

      setTimeout((): void => {
        saveBtn.classList.remove('active');
      }, Delay.active);
    });
  }

  addTrees(): void {
    const treesConrainer = document.querySelector(
      '.choice-tree'
    ) as HTMLElement;

    TREES.forEach((item: string): void => {
      const tree = document.createElement('li');

      tree.classList.add('tree');
      tree.style.backgroundImage = `url(./assets/tree/${item}.png)`;
      tree.setAttribute('data-tree', item);

      treesConrainer.appendChild(tree);
    });

    const christmasTree = document.querySelector(
      '.christmas-tree'
    ) as HTMLImageElement;

    treesConrainer.addEventListener('click', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('tree')) {
        const number = target.dataset.tree;

        if (!number) return;

        this.settings.tree = number;
        christmasTree.src = `./assets/tree/${number}.png`;

        localStorage.settingsBgForTreePage = JSON.stringify(this.settings);
      }
    });
  }

  addBackgrounds(): void {
    const backgroundsConrainer = document.querySelector(
      '.choice-background'
    ) as HTMLElement;

    BACKGROUNDS.forEach((item: string): void => {
      const background = document.createElement('li');

      background.classList.add('background');
      background.style.backgroundImage = `url(./assets/bg/${item}.jpg)`;
      background.setAttribute('data-background', item);

      backgroundsConrainer.appendChild(background);
    });

    const treeContainer = document.querySelector(
      '.tree-container'
    ) as HTMLImageElement;

    backgroundsConrainer.addEventListener('click', (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('background')) {
        const number = target.dataset.background;

        if (!number) return;

        treeContainer.style.backgroundImage = `url(./assets/bg/${number}.jpg)`;

        this.settings.background = number;
        localStorage.settingsBgForTreePage = JSON.stringify(this.settings);
      }
    });
  }

  addToys(): void {
    const toysConrainer = document.querySelector('.choice-toy') as HTMLElement;
    let favoriteToys: Array<string>;
    const fragment = document.createDocumentFragment();

    if (
      localStorage.favoriteForChristmasGame &&
      localStorage.favoriteForChristmasGame !== EMPTY_LS
    ) {
      favoriteToys = JSON.parse(localStorage.favoriteForChristmasGame);

      for (let i = CountUserFavorite.countMin; i < favoriteToys.length; i++) {
        const toy = addToyForPage(+favoriteToys[i] - OFFSET);

        fragment.appendChild(toy);
      }
    } else {
      for (
        let i = CountUserFavorite.countMin;
        i < CountUserFavorite.countMax;
        i++
      ) {
        const toy = addToyForPage(i);

        fragment.appendChild(toy);
      }
    }

    toysConrainer.appendChild(fragment);
  }

  saveTree(): void {
    const saveContainer = document.querySelector(
      '.choice-saving-tree'
    ) as HTMLElement;
    const li = document.createElement('li');
    li.classList.add('save-tree');
    const savingTree = document.querySelector('.tree-container') as HTMLElement;

    html2canvas(savingTree).then((canvas): void => {
      canvas.style.width = SIZE_FOR_CANVAS.size;
      canvas.style.height = SIZE_FOR_CANVAS.size;
      canvas.style.borderRadius = SIZE_FOR_CANVAS.borderRadius;

      li.appendChild(canvas);
      saveContainer.append(li);
    });
  }
}

export default TreePage;
