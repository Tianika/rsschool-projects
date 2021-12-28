import { IDropIvent } from '../utils';

export class DragAndDrop {
  draw(): void {
    const toysContainer = document.querySelector(
      '.choice-toy-container'
    ) as HTMLElement;
    const toys = toysContainer.querySelectorAll(
      '.choice-toy-img'
    ) as NodeListOf<HTMLImageElement>;
    const treeContainer = document.querySelector(
      '.tree-container'
    ) as HTMLElement;
    const decorationContainer = treeContainer.querySelector(
      'map'
    ) as HTMLElement;

    toys.forEach((toy): void => {
      toy.addEventListener('dragstart', (event: Event): void => {
        const target = event.target as HTMLElement;

        target.classList.add('selected');
      });

      toy.addEventListener('dragend', (event: Event): void => {
        const target = event.target as HTMLElement;

        target.classList.remove('selected');
      });
    });

    decorationContainer.addEventListener('dragover', (event: Event): void => {
      event.preventDefault();
    });

    decorationContainer.addEventListener('drop', (event: IDropIvent): void => {
      event.preventDefault();

      const toy = document.querySelector('.selected') as HTMLElement;
      const coords = treeContainer.getBoundingClientRect();

      if (toy) {
        const left = event.clientX - coords.left - 25;
        const top = event.clientY - coords.top - 25;

        toy.classList.remove('selected');
        toy.style.left = `${left}px`;
        toy.style.top = `${top}px`;

        treeContainer.appendChild(toy);
        this.changeCountToys();
      }
    });

    treeContainer.addEventListener('dragover', (event: Event): void => {
      event.preventDefault();
    });

    treeContainer.addEventListener('drop', (event: Event): void => {
      event.preventDefault();

      const toys = toysContainer.querySelectorAll(
        '.choice-toy-item'
      ) as NodeListOf<HTMLImageElement>;
      const toyOnTree = document.querySelector('.selected') as HTMLElement;

      if (toyOnTree) {
        toys.forEach((toy) => {
          if (toyOnTree.dataset.id === toy.dataset.id) {
            toyOnTree.style.left = '4px';
            toyOnTree.style.top = '4px';
            toy.append(toyOnTree);

            this.changeCountToys();
          }
        });
      }
    });
  }

  changeCountToys() {
    const toysContainer = document.querySelector(
      '.choice-toy-container'
    ) as HTMLElement;
    const choiceToysArray = toysContainer.querySelectorAll(
      '.choice-toy-item'
    ) as NodeListOf<HTMLElement>;

    choiceToysArray.forEach((toy) => {
      const toysArray = toy.querySelectorAll(
        '.choice-toy-img'
      ) as NodeListOf<HTMLElement>;
      const toysAmount = toy.querySelector('.toy-amount') as HTMLElement;

      toysAmount.innerText = toysArray.length.toString();
    });
  }
}

export default DragAndDrop;
