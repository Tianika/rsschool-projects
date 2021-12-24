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

    audio.addEventListener('ended', (): void => {
      soundBtn.classList.remove('active');
      isPlay = false;
    });
  }

  drawSnowflakes() {
    let isSnow = false;
    let snowInterval: NodeJS.Timer;

    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    snowBtn.addEventListener('click', (): void => {
      if (!isSnow) {
        isSnow = true;
        snowInterval = setInterval(this.createSnowflake, 200);
        snowBtn.classList.add('active');
      } else {
        isSnow = false;
        clearInterval(snowInterval);
        snowBtn.classList.remove('active');
      }
    });
  }

  createSnowflake() {
    const container = document.querySelector('.tree-container') as HTMLElement;
    const snowflake = document.createElement('span') as HTMLElement;

    const time = Math.random() * 2 + 4;
    const removeTime = time * 1000;
    const size = Math.random() * 20 + 10 + 'px';

    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * container.offsetWidth + 'px';
    snowflake.style.opacity = (Math.random() * 6 + 0.1).toString();
    snowflake.style.animationDuration = time + 's';
    snowflake.style.width = size;
    snowflake.style.height = size;

    container?.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, removeTime);
  }

  saveTree() {}
}

export default Buttons;
