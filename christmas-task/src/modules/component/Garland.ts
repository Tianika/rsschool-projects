import { DEFAULT_STRING, DEFAULT_COLOR } from '../utils';

export class Garland {
  draw() {
    const buttons = document.querySelectorAll(
      '.light'
    ) as NodeListOf<HTMLElement>;
    const lights = document.querySelectorAll(
      '.garland-item li'
    ) as NodeListOf<HTMLElement>;
    const powerBtn = document.querySelector('.power-button') as HTMLElement;
    let isLight = false;

    buttons.forEach((button) => {
      button.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color as string;

        powerBtn.classList.add('active');
        isLight = true;

        lights.forEach((light) => {
          light.classList.value = DEFAULT_STRING;
          light.classList.add(color);
        });
      });
    });

    powerBtn.addEventListener('click', (): void => {
      if (!isLight) {
        powerBtn.classList.add('active');
        isLight = true;

        lights.forEach((light) => {
          light.classList.value = DEFAULT_STRING;
          light.classList.add(DEFAULT_COLOR);
        });
      } else {
        powerBtn.classList.remove('active');
        isLight = false;

        lights.forEach((light) => {
          light.classList.value = DEFAULT_STRING;
        });
      }
    });
  }
}

export default Garland;
