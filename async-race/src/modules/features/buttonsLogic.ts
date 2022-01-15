import { createCar, deleteCar } from '.';
import {
  addCarToPage,
  changeTitle,
  DEFAULT_STRING,
  FIRST_INDEX,
  generateColor,
  generateName,
  NUM_FOR_GENERATE,
} from '../utils';
import { commonState, createInputState } from '../utils/states';

export const renderCar = async (): Promise<void> => {
  if (createInputState.name === DEFAULT_STRING) {
    createInputState.name = generateName();
  }

  createCar(createInputState);
  commonState.countCars += FIRST_INDEX;
  createInputState.name = DEFAULT_STRING;

  const main = document.querySelector('.main') as HTMLElement;

  if (main) {
    changeTitle(commonState.countCars);

    addCarToPage();
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

      addCarToPage();
    }
  }
};

export const generateCars = async () => {
  for (let i = 0; i < NUM_FOR_GENERATE; i++) {
    const car = {
      name: generateName(),
      color: generateColor(),
    };

    createCar(car);
  }

  commonState.countCars += NUM_FOR_GENERATE;
  changeTitle(commonState.countCars);

  addCarToPage();
};
