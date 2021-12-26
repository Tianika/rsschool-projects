import { DELAY } from '../utils';

export class Snowflakes {
  isSnow: boolean;
  //snowInterval: NodeJS.Timer;

  constructor() {
    this.isSnow = false;
  }

  drawSnowflakes() {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    if (localStorage.isSnowForTreePage) {
      this.isSnow = JSON.parse(localStorage.isSnowForTreePage);

      if (this.isSnow) {
        this.snowOn();
      }
    }

    const snowInterval = setInterval(() => {
      if (snowBtn.classList.contains('active')) {
        this.createSnowflake();
      } else {
        clearInterval(snowInterval);
      }
    }, DELAY.delaySnow);

    //this.snowInterval = setInterval(this.createSnowflake, DELAY.delaySnow);

    snowBtn.addEventListener('click', (): void => {
      if (!this.isSnow) {
        this.snowOn();

        const snowInterval1 = setInterval(() => {
          if (snowBtn.classList.contains('active')) {
            this.createSnowflake();
          } else {
            clearInterval(snowInterval1);
          }
        }, DELAY.delaySnow);
      } else {
        this.snowOff();
      }
    });
  }

  snowOn(): void {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    this.isSnow = true;
    snowBtn.classList.add('active');
    localStorage.isSnowForTreePage = JSON.stringify(this.isSnow);
  }

  snowOff(): void {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;

    this.isSnow = false;
    snowBtn.classList.remove('active');
    localStorage.isSnowForTreePage = JSON.stringify(this.isSnow);
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
}

export default Snowflakes;
