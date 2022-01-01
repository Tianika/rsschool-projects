import { DELAY, NUM_FOR_SNOW } from '../utils';
let snowInterval1: NodeJS.Timer;

class Snowflakes {
  isSnow: boolean;

  constructor() {
    this.isSnow = false;
  }

  drawSnowflakes(): void {
    const snowBtn = document.querySelector('.snow-button') as HTMLButtonElement;
    const mainLink = document.querySelector('.link-main') as HTMLButtonElement;
    const toyLink = document.querySelector('.link-toys') as HTMLButtonElement;
    const treeLink = document.querySelector('.link-trees') as HTMLButtonElement;

    if (localStorage.isSnowForTreePage) {
      this.isSnow = JSON.parse(localStorage.isSnowForTreePage);

      if (this.isSnow) {
        this.snowOn();
      }
    }

    const snowInterval = setInterval((): void => {
      if (snowBtn.classList.contains('active')) {
        this.createSnowflake();
      } else {
        clearInterval(snowInterval);
      }
    }, DELAY.snow);

    mainLink.addEventListener('click', (): void => {
      clearInterval(snowInterval);
    });

    toyLink.addEventListener('click', (): void => {
      clearInterval(snowInterval);
    });

    treeLink.addEventListener('click', (): void => {
      clearInterval(snowInterval);
    });

    snowBtn.addEventListener('click', (): void => {
      if (!this.isSnow) {
        this.snowOn();

        snowInterval1 = setInterval((): void => {
          if (snowBtn.classList.contains('active')) {
            this.createSnowflake();
          }
        }, DELAY.snow);
      } else {
        this.snowOff();
        clearInterval(snowInterval1);
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

  createSnowflake(): void {
    const container = document.querySelector(
      '.snowflake-container'
    ) as HTMLElement;

    if (container) {
      const snowflake = document.createElement('span') as HTMLElement;

      const time =
        Math.random() * NUM_FOR_SNOW.offsetDuration + NUM_FOR_SNOW.baseDuration;
      const removeTime = time * NUM_FOR_SNOW.multiplyForSec;
      const size =
        Math.random() * NUM_FOR_SNOW.baseSize +
        NUM_FOR_SNOW.baseSize +
        NUM_FOR_SNOW.unitSize;

      snowflake.classList.add('snowflake');
      snowflake.style.left =
        Math.random() * container.offsetWidth + NUM_FOR_SNOW.unitSize;
      snowflake.style.opacity = (
        Math.random() * NUM_FOR_SNOW.offsetOpacity +
        NUM_FOR_SNOW.baseOpacity
      ).toString();
      snowflake.style.animationDuration = time + NUM_FOR_SNOW.unitTime;
      snowflake.style.width = size;
      snowflake.style.height = size;

      container.appendChild(snowflake);

      setTimeout((): void => {
        snowflake.remove();
      }, removeTime);
    }
  }
}

export default Snowflakes;
