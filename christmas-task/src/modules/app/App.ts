import { MainPage, ToysPage, TreePage } from '../pages';
import { Sound, Snowflakes } from '../component';
import {
  DEFAULT_STRING,
  HashIds,
  SOUND_PATHS,
  DEFAULT_SOUND,
  DELAY,
} from '../utils';

export class App {
  start(): void {
    window.location.hash = DEFAULT_STRING;

    const mainPage = new MainPage();
    mainPage.draw();

    const audio = new Audio();
    audio.src = SOUND_PATHS[DEFAULT_SOUND];

    const sound = new Sound(audio);

    // const treePage: TreePage = new TreePage();
    // treePage.draw();

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);

      if (hash === HashIds.mainId) {
        this.drawMainPage();
      } else if (hash === HashIds.toysId) {
        this.drawToysPage();
      } else if (hash === HashIds.treeId) {
        this.drawTreePage(sound);
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

  drawTreePage(sound: Sound) {
    const treePage: TreePage = new TreePage();
    treePage.draw();

    const soundBtn = document.querySelector(
      '.sound-button'
    ) as HTMLButtonElement;
    sound.playSound(soundBtn);

    const resetBtn = document.querySelector(
      '.reset-button'
    ) as HTMLButtonElement;
    resetBtn.addEventListener('click', () => {
      sound.muteAudio(soundBtn);
      setTimeout(() => {
        resetBtn.classList.remove('active');
      }, DELAY.delayActive);

      delete localStorage.isSoundForTreePage;
    });
  }
}
