import { BtnData } from '../utils';

export const createButton = (data: BtnData): HTMLButtonElement => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add(data.className);
  button.innerText = data.text.toUpperCase();
  button.onclick = data.handler;

  return button;
};
