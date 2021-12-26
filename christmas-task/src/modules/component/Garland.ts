import { DEFAULT_STRING, DEFAULT_COLOR } from '../utils';

export class Garland {
  isLight: Boolean;

  constructor() {
    this.isLight = false;
  }

  draw() {
    const buttons = document.querySelectorAll(
      '.light'
    ) as NodeListOf<HTMLElement>;
    const lights = document.querySelectorAll(
      '.garland-item li'
    ) as NodeListOf<HTMLElement>;
    const powerBtn = document.querySelector('.power-button') as HTMLElement;

    if (localStorage.colorGarlandForChristmasTask) {
      const color = JSON.parse(localStorage.colorGarlandForChristmasTask);

      this.garlandOn(powerBtn, color, lights);
    }

    buttons.forEach((button) => {
      button.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color as string;

        localStorage.colorGarlandForChristmasTask = JSON.stringify(color);

        this.garlandOn(powerBtn, color, lights);
      });
    });

    powerBtn.addEventListener('click', (): void => {
      if (!this.isLight) {
        this.garlandOn(powerBtn, DEFAULT_COLOR, lights);
        localStorage.colorGarlandForChristmasTask =
          JSON.stringify(DEFAULT_COLOR);
      } else {
        this.garlandOff(powerBtn, lights);
      }
    });
  }

  garlandOn(
    powerBtn: HTMLElement,
    color: string,
    lights: NodeListOf<HTMLElement>
  ): void {
    powerBtn.classList.add('active');
    this.isLight = true;

    lights.forEach((light) => {
      light.classList.value = DEFAULT_STRING;
      light.classList.add(color);
    });
  }

  garlandOff(powerBtn: HTMLElement, lights: NodeListOf<HTMLElement>) {
    powerBtn.classList.remove('active');
    this.isLight = false;
    delete localStorage.colorGarlandForChristmasTask;

    lights.forEach((light) => {
      light.classList.value = DEFAULT_STRING;
    });
  }
}

export default Garland;
