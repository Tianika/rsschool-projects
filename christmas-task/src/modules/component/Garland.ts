import {
  DEFAULT_STRING_FOR_CLASSLIST,
  DEFAULT_COLOR_FOR_GARLAND,
} from '../utils';

class Garland {
  isLight: Boolean;

  constructor() {
    this.isLight = false;
  }

  draw(): void {
    const buttons = document.querySelectorAll(
      '.light'
    ) as NodeListOf<HTMLElement>;
    const powerBtn = document.querySelector('.power-button') as HTMLElement;
    const garlandContainer = document.querySelector(
      '.garland-container'
    ) as HTMLElement;

    const fragment = document.createDocumentFragment();

    for (let i = 2; i < 8; i++) {
      const garlandItem: HTMLElement = this.garlandItemCreate(i);

      fragment.appendChild(garlandItem);
    }

    garlandContainer.appendChild(fragment);

    const lights = document.querySelectorAll(
      '.garland-item li'
    ) as NodeListOf<HTMLElement>;

    if (localStorage.colorGarlandForChristmasTask) {
      const color = JSON.parse(localStorage.colorGarlandForChristmasTask);

      this.garlandOn(powerBtn, color, lights);
    }

    buttons.forEach((button): void => {
      button.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color as string;

        localStorage.colorGarlandForChristmasTask = JSON.stringify(color);

        this.garlandOn(powerBtn, color, lights);
      });
    });

    powerBtn.addEventListener('click', (): void => {
      if (!this.isLight) {
        this.garlandOn(powerBtn, DEFAULT_COLOR_FOR_GARLAND, lights);
        localStorage.colorGarlandForChristmasTask = JSON.stringify(
          DEFAULT_COLOR_FOR_GARLAND
        );
      } else {
        this.garlandOff(powerBtn, lights);
      }
    });
  }

  garlandItemCreate(number: number): HTMLElement {
    const garlandItem = document.createElement('ul');
    garlandItem.classList.add('garland-item');

    for (let i = -number; i <= number; i++) {
      const light = this.garlandLightCreate(i);
      garlandItem.appendChild(light);
    }

    return garlandItem;
  }

  garlandLightCreate(num: number): HTMLElement {
    const garlandLight = document.createElement('li');
    const x = -(num ** 2);

    garlandLight.style.transform = `translateY(${x}px) rotate(${-num * 5}deg)`;

    return garlandLight;
  }

  garlandOn(
    powerBtn: HTMLElement,
    color: string,
    lights: NodeListOf<HTMLElement>
  ): void {
    powerBtn.classList.add('active');
    this.isLight = true;

    lights.forEach((light) => {
      light.classList.value = DEFAULT_STRING_FOR_CLASSLIST;
      light.classList.add(color);
    });
  }

  garlandOff(powerBtn: HTMLElement, lights: NodeListOf<HTMLElement>): void {
    powerBtn.classList.remove('active');
    this.isLight = false;
    delete localStorage.colorGarlandForChristmasTask;

    lights.forEach((light): void => {
      light.classList.value = DEFAULT_STRING_FOR_CLASSLIST;
    });
  }
}

export default Garland;
