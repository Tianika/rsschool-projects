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

export const getCars = async (url: string): Promise<Car[]> => {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
};

export const getCar = async (id: string): Promise<Car> => {
  const responce = await fetch(`${ResponceURLS.garage}/${id}`);
  const data = await responce.json();

  return data;
};

export const createCar = async (car: CarData): Promise<Car> => {
  const responce = await fetch(ResponceURLS.garage, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Promise<Car> = responce.json();

  return data;
};

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

export const deleteCar = async (id: string): Promise<void> => {
  await fetch(`${ResponceURLS.garage}/${id}`, {
    method: 'DELETE',
  });

  try {
    const responce = await fetch(`${ResponceURLS.winners}/${id}`);

    if (responce.status === 200) {
      await fetch(`${ResponceURLS.winners}/${id}`, {
        method: 'DELETE',
      });
    }
  } catch (error) {
    console.error(error);
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
