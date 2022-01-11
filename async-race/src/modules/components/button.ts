import { Function } from '../utiles/interfaces';

export const createButton = (
  title: string,
  className: string,
  handlerBtn: Function
): HTMLButtonElement => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add(className);
  button.innerText = title.toUpperCase();
  button.onclick = handlerBtn;

  return button;
};
