import { createPageSubtitle, createPageTitle } from '../components';
import { Car, getCars, PageTitles, ResponceURLS } from '../utils';
import { createCarItem } from '.';
import { commonState } from '../utils/states';

export const garageMainCreate = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  main.classList.add('main');

  const cars = await getCars(
    `${ResponceURLS.garage}?_page=${commonState.pageGarage}&_limit=${commonState.limitGarage}`
  );

  const carsCount = await getCars(ResponceURLS.garage);
  commonState.countCars = carsCount.length;

  const title = createPageTitle(PageTitles.garage, commonState.countCars);
  main.appendChild(title);

  const subtitle = createPageSubtitle(commonState.pageGarage);
  main.appendChild(subtitle);

  const carsContainer = document.createElement('div');
  carsContainer.classList.add('cars-container');

  cars.forEach((car: Car): void => {
    carsContainer.appendChild(createCarItem(car));
  });

  main.appendChild(carsContainer);

  return main;
};
