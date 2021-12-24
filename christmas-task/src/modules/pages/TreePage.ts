import { Header, MainTree, Footer, Buttons } from '../component';
import { DEFAULT_STRING } from '../utils';

export class MainPage {
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
  }

  addTrees() {
    const trees = ['1', '2', '3', '4', '5', '6'];

    const treesConrainer = document.querySelector(
      '.choice-tree'
    ) as HTMLElement;

    trees.forEach((item: string): void => {
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

        christmasTree.src = `../assets/tree/${number}.png`;
      }
    });
  }

  addBackgrounds() {
    const backgrounds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    const backgroundsConrainer = document.querySelector(
      '.choice-background'
    ) as HTMLElement;

    backgrounds.forEach((item: string): void => {
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

        treeContainer.style.backgroundImage = `url(../assets/bg/${number}.jpg)`;
      }
    });
  }
}

export default MainPage;
