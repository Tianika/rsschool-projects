import { DELAY } from '../utils';

export class Buttons {
  isSnow: boolean;
  snowInterval: NodeJS.Timer;

  constructor() {
    (this.isSnow = false), (this.snowInterval = setInterval(() => {}, 0));
  }

  drawSnowflakes() {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    // const snowInterval = setInterval(() => {
    //   if (snowBtn.classList.contains('active')) {
    //     this.snowOn(snowBtn);
    //     localStorage.settingsForTreePage = JSON.stringify(this.settings);
    //   } else {
    //     clearInterval(snowInterval);
    //     this.snowOff(snowBtn);
    //     localStorage.settingsForTreePage = JSON.stringify(this.settings);
    //   }
    // }, 50);

    if (localStorage.settingsForTreePage) {
      const settings = JSON.parse(localStorage.settingsForTreePage);
      this.isSnow = settings.isSnow;

      if (this.isSnow) {
        this.snowInterval = setInterval(this.createSnowflake, DELAY.delaySnow);
        this.snowOn(snowBtn);
      }
    }

    snowBtn.addEventListener('click', (): void => {
      if (!this.isSnow) {
        this.snowInterval = setInterval(this.createSnowflake, DELAY.delaySnow);
        this.snowOn(snowBtn);
        localStorage.settingsForTreePage = JSON.stringify(this.isSnow);
      } else {
        clearInterval(this.snowInterval);
        this.snowOff(snowBtn);
        localStorage.settingsForTreePage = JSON.stringify(this.isSnow);
      }
    });
  }

  snowOn(snowBtn: HTMLButtonElement): void {
    this.isSnow = true;
    snowBtn.classList.add('active');
  }

  snowOff(snowBtn: HTMLButtonElement): void {
    this.isSnow = false;
    snowBtn.classList.remove('active');
  }

  createSnowflake() {
    const container = document.querySelector('.tree-container') as HTMLElement;

    if (container) {
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

      container.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, removeTime);
    }
  }

  resetSettings() {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    this.snowOff(snowBtn);
  }

  saveTree() {}
}

export default Buttons;
