import {
  createCar,
  createTable,
  createWinner,
  deleteCar,
  drive,
  getCar,
  getWinner,
  getWinners,
  startEngine,
  stopEngine,
  updateCar,
  updateWinner,
} from '.';
import { createSvg } from '../components';
import {
  changeSubtitle,
  changeTitle,
  checkCarsPaginationBtn,
  DataRace,
  DEFAULT_STRING,
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
  addActiveClass,
  removeActiveClass,
  Winner,
  DataForUpdateWinner,
  checkWinnersPaginationBtn,
  ResultRace,
  showWinnerMsg,
  ADAPTIVE_POINT,
  MS_PER_SEC,
} from '../utils';
import { addCarToPage, drawCarsOnPage } from './garageMain';

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
    const id: number = getId(event);

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
    const id = +getId(event);
    const car = await getCar(id);

    addActiveClass('update-button');

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
  if (updateInputState.id !== Indexes.zero) {
    updateCar(updateInputState);

    const textInputUpdate = document.querySelector(
      '.input-update'
    ) as HTMLInputElement;
    textInputUpdate.value = DEFAULT_STRING;

    const car = document.querySelector(
      `.car${updateInputState.id}`
    ) as HTMLElement;

    const title = car.querySelector('.car-name') as HTMLElement;
    title.innerHTML = updateInputState.name;

    const carIcon = car.querySelector('.car-icon') as HTMLElement;
    carIcon.innerHTML = createSvg(updateInputState.color);

    updateInputState.id = Indexes.zero;

    removeActiveClass('update-button');
  }
};

const changeCarPage = async (): Promise<void> => {
  addActiveClass('race-button');
  removeActiveClass('reset-button');
  removeMessages();
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

    changeCarPage();
  }
};

export const prevCarPage = async (): Promise<void> => {
  if (commonState.pageGarage !== Indexes.one) {
    commonState.pageGarage -= Indexes.one;

    changeCarPage();
  }
};

const animationDriveCar = async (id: number): PromiseResult => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;
  removeActiveClass('start-button', container);

  const data: DataRace = await startEngine(id);
  addActiveClass('stop-button', container);

  const { velocity, distance } = data;
  const timeRace = distance / velocity;
  const startTime = new Date().getTime();
  const finishTime = startTime + timeRace;
  const dist =
    window.innerWidth > ADAPTIVE_POINT
      ? window.innerWidth - Positions.offsetBig
      : window.innerWidth - Positions.offsetSmall;
  let animationId: number;
  const car = container.querySelector('.car-icon') as HTMLElement;

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

  const stopBtn = container.querySelector('.stop-button') as HTMLButtonElement;
  stopBtn.addEventListener('click', async (event: Event): Promise<void> => {
    Promise.resolve(stopCar(event)).then((): void => {
      window.cancelAnimationFrame(animationId);
    });
  });

  return Promise.resolve(drive(id))
    .then((): ResultRace => checkWinnerOnServer(id, timeRace))
    .catch((): void => showBrokenCar(container, animationId));
};

const checkWinnerOnServer = (id: number, timeRace: number): ResultRace => {
  if (!commonState.winnerData && commonState.isRace) {
    addWinner(id, timeRace);
  }

  return { id, timeRace };
};

const showBrokenCar = (container: HTMLElement, animationId: number): void => {
  addActiveClass('car-error', container);
  window.cancelAnimationFrame(animationId);
};

const addWinner = (id: number, timeRace: number) => {
  commonState.winnerData = { id, timeRace };
  addWinnerToServer();
  showWinnerMsg(id, timeRace);
};

export const driveOneCar = async (event: EventType): Promise<void> => {
  if (event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('active')) {
      const id = getId(event);

      await animationDriveCar(id);
    }
  }
};

const resetAnimationCar = async (id: number): Promise<void> => {
  const container = document.querySelector(`.car${id}`) as HTMLElement;

  const stopBtn = container.querySelector('.stop-button') as HTMLElement;
  stopBtn.classList.remove('active');

  await stopEngine(id);

  const startBtn = container.querySelector('.start-button') as HTMLElement;
  startBtn.classList.add('active');

  const errorMsg = container.querySelector('.car-error') as HTMLElement;
  errorMsg.classList.remove('active');

  const car = container.querySelector('.car-icon') as HTMLElement;
  car.style.left = `${Positions.start}px`;
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

  if (raceBtn.classList.contains('active')) {
    raceBtn.classList.remove('active');
    commonState.isRace = true;

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach(async (car: HTMLElement): Promise<void> => {
      const id = car.dataset.id as string;

      commonState.promises.push(animationDriveCar(+id));
    });

    Promise.all(commonState.promises).then((): void => {
      addActiveClass('reset-button');
      addActiveClass('race-over');
    });
  }
};

export const resetRace = async (event): Promise<void> => {
  const button = event.target as HTMLElement;

  if (button.classList.contains('active')) {
    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;
    const promises: Array<PromiseResult> = [];

    cars.forEach((car: HTMLElement): void => {
      const id = car.dataset.id as string;
      promises.push(Promise.resolve(resetAnimationCar(+id)));
      button.classList.remove('active');
    });

    removeMessages();

    Promise.all(promises).then((): void => {
      addActiveClass('race-button');
      removeMessages();
    });
  }
};

const removeMessages = (): void => {
  removeActiveClass('winner-msg');
  removeActiveClass('race-over');
};

const addWinnerToServer = async (): Promise<void> => {
  Promise.all(commonState.promises).then((): void => {
    commonState.promises = [];

    if (commonState.winnerData) {
      const id = commonState.winnerData.id;
      const timeRace = Number(
        (commonState.winnerData.timeRace / MS_PER_SEC).toFixed(Indexes.two)
      );

      Promise.resolve(getWinner(id)).then((data: Winner | null): void => {
        if (data) {
          let newTime = +data.time;

          if (timeRace < +data.time) {
            newTime = timeRace;
          }

          const newWins = +data.wins + Indexes.one;
          const newData: DataForUpdateWinner = {
            wins: newWins,
            time: newTime,
          };

          updateWinner(id, newData);
        } else {
          createWinner({
            id: id,
            wins: Indexes.one,
            time: timeRace,
          });
        }

        commonState.winnerData = null;
        commonState.isRace = false;
      });
    }
  });
};

const changeWinnersPage = async (): Promise<void> => {
  changeSubtitle(commonState.pageWinners);

  const winnersContainer = document.querySelector(
    '.winners-container'
  ) as HTMLElement;
  winnersContainer.innerHTML = DEFAULT_STRING;

  const winners = await getWinners();
  winnersContainer.appendChild(await createTable(winners));

  checkWinnersPaginationBtn();
};

export const nextWinnersPage = async (): Promise<void> => {
  if (
    commonState.pageWinners <
    Math.ceil(commonState.countWinners / commonState.limitWinners)
  ) {
    commonState.pageWinners += Indexes.one;

    changeWinnersPage();
  }
};

export const prevWinnersPage = async (): Promise<void> => {
  if (commonState.pageWinners !== Indexes.one) {
    commonState.pageWinners -= Indexes.one;

    changeWinnersPage();
  }
};
