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
        const countToys = toy.parentElement?.querySelector(
          '.toy-amount'
        ) as HTMLElement;
        const count = +countToys.innerText - 1;

        const left = event.clientX - coords.left - 25;
        const top = event.clientY - coords.top - 25;

        const fragment = document.createDocumentFragment();
        const newToy = toy.cloneNode(true) as HTMLElement;

        newToy.classList.remove('selected');
        newToy.classList.add('onTree');
        newToy.style.left = `${left}px`;
        newToy.style.top = `${top}px`;

        fragment.append(newToy);
        treeContainer.appendChild(fragment);

        countToys.innerText = count.toString();
        if (count === 0) {
          toy.remove();
        }
      }

      const toysOnTree = document.querySelectorAll(
        '.onTree'
      ) as NodeListOf<HTMLElement>;

      toysOnTree.forEach((toy) => {
        toy.addEventListener('dragstart', (event: Event): void => {
          const target = event.target as HTMLElement;

          target.classList.add('selectedOnTree');
        });

        toy.addEventListener('dragend', (event: Event): void => {
          const target = event.target as HTMLElement;

          target.classList.remove('selectedOnTree');
        });
      });

      const toyOnTree = document.querySelector(
        '.selectedOnTree'
      ) as HTMLElement;

      if (toyOnTree) {
        const left = event.clientX - coords.left - 25;
        const top = event.clientY - coords.top - 25;

        toyOnTree.style.left = `${left}px`;
        toyOnTree.style.top = `${top}px`;
      }
    });

    const basket = document.querySelector('.basket') as HTMLElement;

    basket.addEventListener('dragover', (event: Event): void => {
      event.preventDefault();
    });

    basket.addEventListener('drop', (event: Event): void => {
      event.preventDefault();

      const toys = toysContainer.querySelectorAll(
        '.choice-toy-item'
      ) as NodeListOf<HTMLImageElement>;
      const toyOnTree = document.querySelector(
        '.selectedOnTree'
      ) as HTMLElement;

      if (toyOnTree) {
        toys.forEach((toy) => {
          if (toyOnTree.dataset.id === toy.dataset.id) {
            console.log(toy);
            let amountToys = toy.querySelector('.toy-amount') as HTMLElement;
            let count = amountToys.innerText;

            if (+count === 0) {
              toy.append(toyOnTree);
              toyOnTree.classList.remove('onTree');
              amountToys.innerText = (+count + 1).toString();
            } else if (+count > 0) {
              amountToys.innerText = (+count + 1).toString();
              toyOnTree.remove();
            }
          }
        });
      }
    });
  }
}

export default DragAndDrop;
