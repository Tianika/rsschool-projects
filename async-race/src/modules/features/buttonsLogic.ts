import {
  createCar,
  deleteCar,
  drive,
  getCar,
  startEngine,
  stopEngine,
  updateCar,
} from '.';
import { createSvg } from '../components/car';
import {
  addCarToPage,
  changeSubtitle,
  changeTitle,
  checkCarsPaginationBtn,
  DEFAULT_STRING,
  drawCarsOnPage,
  FIRST_INDEX,
  generateColor,
  generateName,
  getId,
  MS_PER_SEC,
  NUM_FOR_GENERATE,
} from '../utils';
import {
  commonState,
  createInputState,
  updateInputState,
} from '../utils/states';

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

  checkCarsPaginationBtn();

  const input = document.querySelector('.input-create') as HTMLInputElement;
  input.value = DEFAULT_STRING;
};

export const removeCar = async (event: Event | undefined): Promise<void> => {
  if (event) {
    const id = getId(event);

    if (id) {
      await deleteCar(id);

      const carForDelete = document.querySelector(`.car${id}`) as HTMLElement;
      carForDelete.parentNode?.removeChild(carForDelete);

      commonState.countCars -= FIRST_INDEX;
      changeTitle(commonState.countCars);

      addCarToPage();
      checkCarsPaginationBtn();
    }
  }
};

export const generateCars = (): void => {
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
  checkCarsPaginationBtn();
};

export const selectCar = async (event: Event | undefined): Promise<void> => {
  if (event) {
    const id = getId(event);
    const car = await getCar(id);

    const updateBtn = document.querySelector(
      '.update-button'
    ) as HTMLButtonElement;
    updateBtn.classList.add('active');

    const textInputUpdate = document.querySelector(
      '.input-update'
    ) as HTMLInputElement;
    textInputUpdate.value = car.name;

    const colorInputUpdate = document.querySelector(
      '.color-for-update'
    ) as HTMLInputElement;
    colorInputUpdate.value = car.color;

    updateInputState.name = car.name;
    updateInputState.color = car.color;
    updateInputState.id = id;
  }
};

export const changeUpdatedCar = (): void => {
  if (updateInputState.id !== DEFAULT_STRING) {
    updateCar(updateInputState);

    const car = document.querySelector(
      `.car${updateInputState.id}`
    ) as HTMLElement;

    const title = car?.querySelector('.car-name') as HTMLElement;
    title.innerHTML = updateInputState.name;

    const carIcon = car?.querySelector('.car-icon') as HTMLElement;
    carIcon.innerHTML = createSvg(updateInputState.color);

    updateInputState.id = DEFAULT_STRING;

    const updateBtn = document.querySelector(
      '.update-button'
    ) as HTMLButtonElement;
    updateBtn.classList.remove('active');

    const textInputUpdate = document.querySelector(
      '.input-update'
    ) as HTMLInputElement;
    textInputUpdate.value = DEFAULT_STRING;
  }
};

export const changePage = async (): Promise<void> => {
  changeSubtitle(commonState.pageGarage);
  await drawCarsOnPage();
  checkCarsPaginationBtn();
};

export const nextCarPage = async (): Promise<void> => {
  if (
    commonState.pageGarage <
    Math.ceil(commonState.countCars / commonState.limitGarage)
  ) {
    commonState.pageGarage += 1;

    changePage();
  }
};

export const prevCarPage = async (): Promise<void> => {
  if (commonState.pageGarage !== FIRST_INDEX) {
    commonState.pageGarage -= 1;

    changePage();
  }
};

const animationDriveCar = async (id: string) => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  // if (target.classList.contains('active')) {
  const startBtn = container.querySelector('.start-button') as HTMLElement;
  startBtn.classList.remove('active');

  const data = await startEngine(id);
  const { velocity, distance } = data;
  const timeRace = distance / velocity;

  const stopBtn = container.querySelector('.stop-button') as HTMLElement;
  stopBtn.classList.add('active');

  const car = container.querySelector('.car-icon') as HTMLElement;

  const startTime = new Date().getTime();
  const finishTime = startTime + timeRace;
  const dist = window.innerWidth - 320;

  let animationId: number;

  function anim(): void {
    const currentTime = new Date().getTime();

    if (currentTime < finishTime) {
      const newPos = 0 + (dist / timeRace) * (currentTime - startTime);
      car.style.left = `${0 + newPos}px`;

      animationId = window.requestAnimationFrame(anim);
    }
  }

  anim();

  Promise.resolve(drive(id))
    .then((data) => {
      return data;
    })
    .catch((err) => {
      const errorMsg = container.querySelector('.car-error') as HTMLElement;
      errorMsg.classList.add('active');

      window.cancelAnimationFrame(animationId);
      console.error(err);
    });
  // }
};

export const driveCar = async (event: Event | undefined): Promise<void> => {
  if (event) {
    //const target = event.target as HTMLElement;
    const id = getId(event);

    animationDriveCar(id);
  }
};

const resetAnimationCar = async (id: string) => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  // if (target.classList.contains('active')) {
  const stopBtn = container.querySelector('.stop-button') as HTMLElement;
  stopBtn.classList.remove('active');

  await stopEngine(id);

  const startBtn = container.querySelector('.start-button') as HTMLElement;
  startBtn.classList.add('active');

  const errorMsg = container.querySelector('.car-error') as HTMLElement;
  errorMsg.classList.remove('active');

  const car = container.querySelector('.car-icon') as HTMLElement;
  car.style.left = '0px';
  //}
};

export const stopCar = async (event: Event | undefined): Promise<void> => {
  if (!event) return;

  const target = event.target as HTMLElement;
  const id = getId(event);

  resetAnimationCar(id);
};

export const startRace = () => {
  const raceBtn = document.querySelector('.race-button') as HTMLButtonElement;

  if (raceBtn.classList.contains('active')) {
    raceBtn.classList.remove('active');

    const resetBtn = document.querySelector('.reset-button') as HTMLElement;
    resetBtn.classList.add('active');

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach((car) => {
      const id = car.dataset.id as string;

      animationDriveCar(id);
    });
  }

  // Promise.all();
};

export const resetRace = () => {
  const resetBtn = document.querySelector('.reset-button') as HTMLButtonElement;

  if (resetBtn.classList.contains('active')) {
    resetBtn.classList.remove('active');

    const raceBtn = document.querySelector('.race-button') as HTMLElement;
    raceBtn.classList.add('active');

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach((car) => {
      const id = car.dataset.id as string;

      resetAnimationCar(id);
    });
  }

  // Promise.all();
};
