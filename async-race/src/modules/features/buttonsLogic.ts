import {
  createCar,
  deleteCar,
  drive,
  getCar,
  startEngine,
  stopEngine,
  updateCar,
} from '.';
import { createSvg } from '../components';
import {
  addCarToPage,
  changeSubtitle,
  changeTitle,
  checkCarsPaginationBtn,
  DataRace,
  DEFAULT_STRING,
  drawCarsOnPage,
  EventType,
  generateColor,
  generateName,
  getId,
  NUM_FOR_GENERATE,
  Positions,
  commonState,
  createInputState,
  updateInputState,
  PromiseResult,
  Indexes,
} from '../utils';

export const renderCar = async (): Promise<void> => {
  if (createInputState.name === DEFAULT_STRING) {
    createInputState.name = generateName();
  }

  createCar(createInputState);
  commonState.countCars += Indexes.one;
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

export const removeCar = async (event: EventType): Promise<void> => {
  if (event) {
    const id = getId(event);

    if (id) {
      await deleteCar(id);

      const carForDelete = document.querySelector(`.car${id}`) as HTMLElement;
      carForDelete.parentNode?.removeChild(carForDelete);

      commonState.countCars -= Indexes.one;
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

export const selectCar = async (event: EventType): Promise<void> => {
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
  console.log(updateInputState);
  if (updateInputState.id !== DEFAULT_STRING) {
    updateCar(updateInputState);

    const car = document.querySelector(
      `.car${updateInputState.id}`
    ) as HTMLElement;

    const title = car.querySelector('.car-name') as HTMLElement;
    title.innerHTML = updateInputState.name;

    const carIcon = car.querySelector('.car-icon') as HTMLElement;
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
    commonState.pageGarage += Indexes.one;

    changePage();
  }
};

export const prevCarPage = async (): Promise<void> => {
  if (commonState.pageGarage !== Indexes.one) {
    commonState.pageGarage -= Indexes.one;

    changePage();
  }
};

const animationDriveCar = async (id: string): PromiseResult => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  const startBtn = container.querySelector('.start-button') as HTMLElement;
  startBtn.classList.remove('active');

  const data: DataRace = await startEngine(id);
  const { velocity, distance } = data;
  const timeRace = distance / velocity;

  const stopBtn = container.querySelector('.stop-button') as HTMLElement;
  stopBtn.classList.add('active');

  const car = container.querySelector('.car-icon') as HTMLElement;

  const startTime = new Date().getTime();
  const finishTime = startTime + timeRace;
  const dist = window.innerWidth - Positions.offset;

  let animationId: number;

  function animation(): void {
    const currentTime = new Date().getTime();

    if (currentTime < finishTime) {
      const newPos =
        Positions.start + (dist / timeRace) * (currentTime - startTime);
      car.style.left = `${Positions.start + newPos}px`;

      animationId = window.requestAnimationFrame(animation);
    }
  }

  animation();

  stopBtn.addEventListener('click', async (event: Event): Promise<void> => {
    await stopCar(event);
    window.cancelAnimationFrame(animationId);
  });

  const result = Promise.resolve(drive(id))
    .then(() => {
      console.log({ id, timeRace });

      return { id, timeRace };
    })
    .catch((err: string): void => {
      const errorMsg = container.querySelector('.car-error') as HTMLElement;
      errorMsg.classList.add('active');

      window.cancelAnimationFrame(animationId);
      console.error(err);
    });

  console.log(result);
  return result;
};

export const driveCar = async (event: EventType): Promise<void> => {
  if (event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) {
      const id = getId(event);

      await animationDriveCar(id);
    }
  }
};

const resetAnimationCar = async (id: string): Promise<void> => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  const stopBtn = container.querySelector('.stop-button') as HTMLElement;
  stopBtn.classList.remove('active');

  await stopEngine(id);

  const startBtn = container.querySelector('.start-button') as HTMLElement;
  startBtn.classList.add('active');

  const errorMsg = container.querySelector('.car-error') as HTMLElement;
  errorMsg.classList.remove('active');

  const car = container.querySelector('.car-icon') as HTMLElement;
  car.style.left = '0px';
};

export const stopCar = async (event: EventType): Promise<void> => {
  if (!event) return;

  const target = event.target as HTMLElement;

  if (target.classList.contains('active')) {
    const id = getId(event);

    await resetAnimationCar(id);
  }
};

export const startRace = async (): Promise<void> => {
  const raceBtn = document.querySelector('.race-button') as HTMLButtonElement;
  const promises: Array<PromiseResult> = [];

  if (raceBtn.classList.contains('active')) {
    raceBtn.classList.remove('active');

    const resetBtn = document.querySelector('.reset-button') as HTMLElement;
    resetBtn.classList.add('active');

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach(async (car: HTMLElement): Promise<void> => {
      const id = car.dataset.id as string;

      promises.push(animationDriveCar(id));
    });
  }

  Promise.all(promises).then((data) => console.log(data));
};

export const resetRace = (): void => {
  const resetBtn = document.querySelector('.reset-button') as HTMLButtonElement;

  if (resetBtn.classList.contains('active')) {
    resetBtn.classList.remove('active');

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach(async (car: HTMLElement): Promise<void> => {
      const id = car.dataset.id as string;

      await resetAnimationCar(id);
    });

    const raceBtn = document.querySelector('.race-button') as HTMLElement;
    raceBtn.classList.add('active');
  }
};
