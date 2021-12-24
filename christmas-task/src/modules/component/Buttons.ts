import { DEFAULT_SOUND } from '../utils';

export class Buttons {
  playSound() {
    let isPlay = false;
    const soundPaths = ['../../assets/audio/audio.mp3'];
    const audio = new Audio();
    audio.src = soundPaths[DEFAULT_SOUND];

    const soundBtn = document.querySelector(
      '.sound-button'
    ) as HTMLButtonElement;

    soundBtn.addEventListener('click', (): void => {
      if (!isPlay) {
        audio.play();
        soundBtn.classList.add('active');
        isPlay = true;
      } else {
        audio.pause();
        soundBtn.classList.remove('active');
        isPlay = false;
      }
    });

    audio.addEventListener('ended', () => {
      soundBtn.classList.remove('active');
      isPlay = false;
    });
  }

  drawSnowflakes() {}

  saveTree() {}
}

export default Buttons;
