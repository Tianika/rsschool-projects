import { createCar, createCarItem, deleteCar, getCars } from '.';
import { changeTitle, FIRST_INDEX, ResponceURLS } from '../utils';
import { commonState, createInputState } from '../utils/states';

export const renderCar = async (): Promise<void> => {
  createCar(createInputState);
  commonState.countCars += FIRST_INDEX;

  const main = document.querySelector('.main') as HTMLElement;

  if (main) {
    changeTitle(commonState.countCars);

    const carsOnPage = document.querySelectorAll('.car-item').length as Number;

    if (carsOnPage < commonState.limitGarage) {
      const cars = await getCars(
        `${ResponceURLS.garage}?_page=${commonState.pageGarage}&_limit=${commonState.limitGarage}`
      );
      const car = cars[cars.length - FIRST_INDEX];

      const carsContainer = document.querySelector(
        '.cars-container'
      ) as HTMLElement;

      carsContainer.appendChild(createCarItem(car));
    }
  }
};

export const removeCar = async (event: Event | undefined): Promise<void> => {
  if (event) {
    const target = event.target as HTMLElement;
    const id = target.dataset.id;

    if (id) {
      await deleteCar(id);

      const carForDelete = document.querySelector(`.car${id}`) as HTMLElement;
      carForDelete.parentNode?.removeChild(carForDelete);

      commonState.countCars -= FIRST_INDEX;
      changeTitle(commonState.countCars);

      const cars = await getCars(
        `${ResponceURLS.garage}?_page=${commonState.pageGarage}&_limit=${commonState.limitGarage}`
      );
      const carsOnPage = document.querySelectorAll('.car-item')
        .length as Number;

      if (cars.length > carsOnPage) {
        const car = cars[cars.length - FIRST_INDEX];

        const carsContainer = document.querySelector(
          '.cars-container'
        ) as HTMLElement;

        carsContainer.appendChild(createCarItem(car));
      }
    }
  }
};
