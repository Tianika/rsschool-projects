import { MainPage, ToysPage, TreePage } from '../pages';
import { DEFAULT_STRING, HashIds } from '../utils/constants';

export class App {
  start(): void {
    const mainPage = new MainPage();
    window.location.hash = DEFAULT_STRING;
    mainPage.draw();

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);

      if (hash === HashIds.mainId) {
        this.drawMainPage();
      } else if (hash === HashIds.toysId) {
        this.drawToysPage();
      } else if (hash === HashIds.treeId) {
        this.drawTreePage();
      }
    });
  }

  drawMainPage() {
    const mainPage: MainPage = new MainPage();
    mainPage.draw();
  }

  drawToysPage() {
    const toysPage: ToysPage = new ToysPage();
    toysPage.draw();
  }

  drawTreePage() {
    const treePage: TreePage = new TreePage();
    treePage.draw();
  }
}
