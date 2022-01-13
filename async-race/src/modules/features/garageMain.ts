import { createPageSubtitle, createPageTitle } from '../components';
import { Car, LimitCars, PageTitles, ResponceURLS } from '../utils';
import { createCarItem } from '.';

export const garageMainCreate = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  main.classList.add('main');

  const page = 1;

  const cars = await getCars(
    `${ResponceURLS.garage}?_page=${page}&_limit=${LimitCars.forGarage}`
  );

  const title = createPageTitle(PageTitles.garage, cars.length);
  main.appendChild(title);

  const subtitle = createPageSubtitle(page);
  main.appendChild(subtitle);

  const carsContainer = document.createElement('div');
  carsContainer.classList.add('cars-container');

  cars.forEach((car: Car): void => {
    carsContainer.appendChild(createCarItem(car));
  });

  main.appendChild(carsContainer);

  return main;
};

async function getCars(url: string): Promise<Car[]> {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
}
