import { MainPage, ToysPage, TreePage } from '../pages';
import { Sound } from '../component';
import {
  DEFAULT_STRING,
  HashIds,
  SOUND_PATHS,
  SoundPaths,
  DELAY,
} from '../utils';

export class App {
  start(): void {
    window.location.hash = DEFAULT_STRING;

    const mainPage = new MainPage();
    mainPage.draw();

    const audio = new Audio();
    audio.src = SOUND_PATHS[SoundPaths.default];

    const sound = new Sound(audio);

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

  drawMainPage(): void {
    const mainPage = new MainPage();
    mainPage.draw();
  }

  drawToysPage(): void {
    const toysPage = new ToysPage();
    toysPage.draw();
  }

  drawTreePage(sound: Sound): void {
    const treePage = new TreePage();
    treePage.draw();

    const soundBtn = document.querySelector(
      '.sound-button'
    ) as HTMLButtonElement;
    sound.playSound(soundBtn);

    const resetBtn = document.querySelector(
      '.reset-button'
    ) as HTMLButtonElement;
    resetBtn.addEventListener('click', (): void => {
      sound.muteAudio(soundBtn);
      setTimeout(() => {
        resetBtn.classList.remove('active');
      }, DELAY.delayActive);

      delete localStorage.isSoundForTreePage;
    });
  }
}

export default App;
