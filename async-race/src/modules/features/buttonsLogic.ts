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

export const driveCar = async (event: Event | undefined): Promise<void> => {
  if (event) {
    const target = event.target as HTMLElement;
    const id = getId(event);
    const container = document.querySelector(`.car${id}`) as HTMLElement;

    if (target.classList.contains('active')) {
      const startBtn = container.querySelector('.start-button') as HTMLElement;
      startBtn?.classList.remove('active');

      const data = await startEngine(id);
      const { velocity, distance } = data;
      const timeRace = distance / velocity;

      const stopBtn = container.querySelector('.stop-button') as HTMLElement;
      stopBtn?.classList.add('active');

      const car = container.querySelector('.car-icon') as HTMLElement;

      const startTime = new Date().getTime();
      const finishTime = startTime + timeRace;
      const dist = window.innerWidth - 320;

      let animationId;

      function anim() {
        const currentTime = new Date().getTime();

        if (currentTime < finishTime) {
          const newPos = 0 + (dist / timeRace) * (currentTime - startTime);
          car.style.left = `${0 + newPos}px`;

          animationId = window.requestAnimationFrame(anim);
        }
      }

      anim();

      const driver = await drive(id);
      if (!driver?.success) {
        window.cancelAnimationFrame(animationId);
      }
      console.log(driver);
    }
  }
};

export const stopCar = async (event: Event | undefined): Promise<void> => {
  if (!event) return;

  const target = event.target as HTMLElement;
  const id = getId(event);
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  if (target.classList.contains('active')) {
    const startBtn = container.querySelector('.start-button') as HTMLElement;
    startBtn?.classList.add('active');

    const data = await stopEngine(id);

    const stopBtn = container.querySelector('.stop-button') as HTMLElement;
    stopBtn?.classList.remove('active');

    console.log(data);
  }
};
