import { BtnData, Delays } from '../utils';

export const createButton = (data: BtnData): HTMLButtonElement => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add(data.className);

  if (data.isActive) {
    button.classList.add('active');
  }

  button.innerText = data.text.toUpperCase();
  button.addEventListener('click', (event?: Event) => data.handler(event));
  button.addEventListener('click', (): void => {
    if (button.classList.contains('active')) {
      button.classList.add('click');
      setTimeout((): void => button.classList.remove('click'), Delays.animBtn);
    }
  });

  return button;
};
