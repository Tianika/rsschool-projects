import { DEFAULT_SOUND, ISettings, DELAY } from '../utils';

export class Buttons {
  settings: ISettings;
  audio: HTMLAudioElement;
  snowInterval: NodeJS.Timer;

  constructor() {
    this.settings = {
      isPlay: false,
      isSnow: false,
    };
    this.audio = new Audio();
    this.snowInterval = setInterval(() => {}, DELAY.delayDefault);
  }

  playSound() {
    const soundBtn = document.querySelector(
      '.sound-button'
    ) as HTMLButtonElement;
    const soundPaths = ['../../assets/audio/audio.mp3'];
    this.audio.src = soundPaths[DEFAULT_SOUND];

    if (localStorage.settingsForTreePage) {
      const settings = JSON.parse(localStorage.settingsForTreePage);

      this.settings.isPlay = settings.isPlay;

      if (this.settings.isPlay) {
        soundBtn.classList.add('active');
        document.addEventListener(
          'click',
          (): void => {
            this.playAudio(soundBtn);
          },
          { once: true }
        );
      }
    }

    soundBtn.addEventListener('click', (): void => {
      if (!this.settings.isPlay) {
        this.playAudio(soundBtn);
      } else {
        this.muteAudio(soundBtn);
      }
    });

    this.audio.addEventListener('ended', (): void => {
      this.muteAudio(soundBtn);
    });
  }

  playAudio(soundBtn: HTMLButtonElement) {
    this.audio.play();
    soundBtn.classList.add('active');
    this.settings.isPlay = true;
    localStorage.settingsForTreePage = JSON.stringify(this.settings);
  }

  muteAudio(soundBtn: HTMLButtonElement) {
    this.audio.pause();
    soundBtn.classList.remove('active');
    this.settings.isPlay = false;
    localStorage.settingsForTreePage = JSON.stringify(this.settings);
  }

  drawSnowflakes() {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    if (localStorage.settingsForTreePage) {
      const settings = JSON.parse(localStorage.settingsForTreePage);

      this.settings.isSnow = settings.isSnow;

      if (this.settings.isSnow) {
        this.snowInterval = setInterval(this.createSnowflake, DELAY.delaySnow);

        this.snowOn(snowBtn);
      }
    }

    snowBtn.addEventListener('click', (): void => {
      if (!this.settings.isSnow) {
        this.snowInterval = setInterval(this.createSnowflake, DELAY.delaySnow);
        this.snowOn(snowBtn);
        localStorage.settingsForTreePage = JSON.stringify(this.settings);
      } else {
        clearInterval(this.snowInterval);
        this.snowOff(snowBtn);
        localStorage.settingsForTreePage = JSON.stringify(this.settings);
      }
    });
  }

  snowOn(snowBtn: HTMLButtonElement): void {
    this.settings.isSnow = true;
    snowBtn.classList.add('active');
  }

  snowOff(snowBtn: HTMLButtonElement): void {
    this.settings.isSnow = false;
    snowBtn.classList.remove('active');
  }

  createSnowflake() {
    const container = document.querySelector('.tree-container') as HTMLElement;
    const snowflake = document.createElement('span') as HTMLElement;

    const time = Math.random() * 2 + 4;
    const removeTime = time * 1000;
    const size = Math.random() * 15 + 15 + 'px';

    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * container.offsetWidth + 'px';
    snowflake.style.opacity = (Math.random() * 4 + 0.2).toString();
    snowflake.style.animationDuration = time + 's';
    snowflake.style.width = size;
    snowflake.style.height = size;

    container?.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, removeTime);
  }

  resetSettings() {
    const soundBtn = document.querySelector(
      '.sound-button'
    ) as HTMLButtonElement;
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    clearInterval(this.snowInterval);
    this.muteAudio(soundBtn);
    this.snowOff(snowBtn);
  }

  saveTree() {}
}

export default Buttons;
