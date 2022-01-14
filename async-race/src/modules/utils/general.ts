import { Car, CarData, FIRST_INDEX, LinkData, ResponceURLS } from '.';
import { createCarItem } from '../features';
import { commonState, createInputState } from './states';

export const createLink = (target: string, data: LinkData): HTMLElement => {
  const div = document.createElement('div');
  div.classList.add(data.class);

  const link = document.createElement('a');
  link.href = data.link;
  link.target = target;
  link.innerText = data.text;

  div.appendChild(link);

  return div;
};

export const changeTitle = (number: number) => {
  const title = document.querySelector('.garage-title') as HTMLElement;
  title.innerHTML = `Garage (${number})`;
};
