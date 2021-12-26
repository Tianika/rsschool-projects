export class DragAndDrop {
  draw(): void {
    const toys = document.querySelectorAll(
      '.choice-toy-img'
    ) as NodeListOf<HTMLImageElement>;
    const tree = document.querySelector('.tree-container') as HTMLElement;

    toys.forEach((toy) => {
      toy.addEventListener('dragstart', (event: Event): void => {
        const target = event.target as HTMLElement;

        target.classList.add('selected');
      });

      toy.addEventListener('dragend', (event: Event): void => {
        const target = event.target as HTMLElement;

        target.classList.remove('selected');
      });
    });

    tree.addEventListener('dragover', (event: Event): void => {
      event.preventDefault();
    });

    tree.addEventListener('drop', (event: Event): void => {
      event.preventDefault();

      const toy = document.querySelector('.selected') as HTMLElement;
      const coords = tree.getBoundingClientRect();

      const left = event.clientX - coords.left - 25;
      const top = event.clientY - coords.top - 25;

      toy.style.left = `${left}px`;
      toy.style.top = `${top}px`;

      tree.appendChild(toy);
    });
  }
}

export default DragAndDrop;
