import { BtnData } from '../utils';

export const createButton = (data: BtnData): HTMLButtonElement => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add(data.className);

  if (data.isActive) {
    button.classList.add('active');
  }

  button.innerText = data.text.toUpperCase();
  button.addEventListener('click', (event: Event | undefined) =>
    data.handler(event)
  );

  return button;
};
