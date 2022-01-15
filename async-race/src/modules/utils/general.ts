import { Car, CarData, FIRST_INDEX, HEX_CODE, LinkData, ResponceURLS } from '.';
import { carBrands, carModels } from '../data';
import { createCarItem, getCars } from '../features';
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

export const changeTitle = (number: number): void => {
  const title = document.querySelector('.garage-title') as HTMLElement;
  title.innerHTML = `Garage (${number})`;
};

export const randomNumber = (length: number): number => {
  return Math.floor(Math.random() * length);
};

export const generateName = (): string => {
  const brand = carBrands[randomNumber(carBrands.length)];
  const model = carModels[randomNumber(carModels.length)];

  return `${brand} ${model}`;
};

export const generateColor = (): string => {
  const color: string[] = [];

  for (let i = 0; i < 6; i++) {
    color.push(HEX_CODE[randomNumber(HEX_CODE.length)]);
  }

  return `#${color.join('')}`;
};

export const addCarToPage = async (): Promise<void> => {
  const cars = await getCars(
    `${ResponceURLS.garage}?_page=${commonState.pageGarage}&_limit=${commonState.limitGarage}`
  );
  const carsOnPage = document.querySelectorAll('.car-item').length as number;

  const carsContainer = document.querySelector(
    '.cars-container'
  ) as HTMLElement;

  for (let i = carsOnPage; i < cars.length; i++) {
    const car = cars[i];

    carsContainer.appendChild(createCarItem(car));
  }
};
