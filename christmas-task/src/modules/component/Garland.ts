export class Garland {
  draw() {
    const buttons = document.querySelectorAll(
      '.light'
    ) as NodeListOf<HTMLElement>;
    const lights = document.querySelectorAll(
      '.garland-item li'
    ) as NodeListOf<HTMLElement>;
    const powerBtn = document.querySelector('.power-button') as HTMLElement;

    buttons.forEach((button) => {
      button.addEventListener('click', (event: Event): void => {
        const target = event.target as HTMLElement;
        const color = target.dataset.color as string;

        lights.forEach((light) => {
          light.classList.value = '';
          light.classList.add(color);
          powerBtn.classList.add('active');
        });
      });
    });

    powerBtn.addEventListener('click', () => {
      powerBtn.classList.toggle('active');
    });
  }
}

export default Garland;
