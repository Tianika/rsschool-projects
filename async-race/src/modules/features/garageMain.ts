import {
  createButton,
  createPageSubtitle,
  createPageTitle,
} from '../components';
import {
  Car,
  DATA_PAGINATION_CARS_BTNS,
  PageTitles,
  ResponceURLS,
  commonState,
  DEFAULT_STRING,
} from '../utils';
import { createCarItem, getCars } from '.';

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

  DATA_PAGINATION_CARS_BTNS.forEach((data) => {
    subtitle.appendChild(createButton(data));
  });

  main.appendChild(subtitle);

  const carsContainer = document.createElement('div');
  carsContainer.classList.add('cars-container');

  cars.forEach((car: Car): void => {
    carsContainer.appendChild(createCarItem(car));
  });

  main.appendChild(carsContainer);

  return main;
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

export const drawCarsOnPage = async (): Promise<void> => {
  const carsContainer = document.querySelector(
    '.cars-container'
  ) as HTMLElement;
  carsContainer.innerHTML = DEFAULT_STRING;

  const cars = await getCars(
    `${ResponceURLS.garage}?_page=${commonState.pageGarage}&_limit=${commonState.limitGarage}`
  );

  cars.forEach((car: Car): void => {
    carsContainer.appendChild(createCarItem(car));
  });
};
