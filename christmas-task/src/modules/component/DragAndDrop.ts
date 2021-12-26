export class DragAndDrop {
  draw() {
    const toys = document.querySelectorAll('.choice-toy-img');
    const tree = document.querySelector('.tree-container') as HTMLElement;

    tree.addEventListener('dragover', (event: Event): void => {
      event.preventDefault();
    });

    toys.forEach((toy) => {
      toy.addEventListener('dragstart', (event: Event): void => {
        event.dataTransfer.setData('id', event.target.id);
      });
    });

    tree.addEventListener('drop', (event: Event): void => {
      event.preventDefault();

      const itemNumber = event.dataTransfer.getData('id');
      const toy = document.getElementById(itemNumber) as HTMLElement;
      const toyAmount = toy.parentElement.querySelector(
        '.toy-amount'
      ) as HTMLElement;
      const count = toyAmount.innerText;

      if (+count > 0) {
        tree.append(toy.cloneNode(true));

        toyAmount.innerText = (count - 1).toString();
      } else {
        tree.append(toy);
      }

      console.log(count);
    });
  }
}

export default DragAndDrop;
