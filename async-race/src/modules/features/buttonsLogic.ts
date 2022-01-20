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
  checkWinner,
  CheckWinner,
  PromiseRaceResolve,
  Winner,
  DataForUpdateWinner,
  checkWinnersPaginationBtn,
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
    const id: string = getId(event);

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

    removeActiveClass('update-button');

    const textInputUpdate = document.querySelector(
      '.input-update'
    ) as HTMLInputElement;
    textInputUpdate.value = DEFAULT_STRING;
  }
};

const changeCarPage = async (): Promise<void> => {
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
    Promise.resolve(stopCar(event)).then(() => {
      window.cancelAnimationFrame(animationId);
    });
  });

  const result = Promise.resolve(drive(id))
    .then(() => {
      return { id, timeRace };
    })
    .catch((): void => {
      const errorMsg = container.querySelector('.car-error') as HTMLElement;
      errorMsg.classList.add('active');

      window.cancelAnimationFrame(animationId);
    });
  console.log(result);
  return result;
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

    const cars = document.querySelectorAll(
      '.car-item'
    ) as NodeListOf<HTMLElement>;

    cars.forEach(async (car: HTMLElement): Promise<void> => {
      const id = car.dataset.id as string;

      commonState.promises.push(animationDriveCar(id));
    });
  }

  const resetBtn = document.querySelector('.reset-button') as HTMLButtonElement;
  resetBtn.addEventListener('click', async (): Promise<void> => {
    if (resetBtn.classList.contains('active')) {
      const cars = document.querySelectorAll(
        '.car-item'
      ) as NodeListOf<HTMLElement>;
      const promises: Array<PromiseResult> = [];

      cars.forEach((car: HTMLElement): void => {
        const id = car.dataset.id as string;
        promises.push(Promise.resolve(resetAnimationCar(id)));
        resetBtn.classList.remove('active');
      });

      Promise.all(promises).then((): void => {
        addActiveClass('race-button');
      });
    }
  });

  Promise.all(commonState.promises).then((data: PromiseRaceResolve[]) => {
    commonState.raceResult = [...data];

    const winner: CheckWinner | void = checkWinner(commonState.raceResult);

    commonState.raceResult = [];
    commonState.promises = [];

    if (winner) {
      Promise.resolve(getWinner(winner.id)).then(
        (data: Winner | null): void => {
          const resetBtn = document.querySelector(
            '.reset-button'
          ) as HTMLButtonElement;
          resetBtn.classList.add('active');

          if (data) {
            let newTime = +data.time;

            if (winner.timeRace < +data.time) {
              newTime = winner.timeRace;
            }

            const newWins = data.wins + Indexes.one;
            const newData: DataForUpdateWinner = {
              wins: newWins,
              time: newTime,
            };

            updateWinner(winner.id, newData);
          } else {
            createWinner({
              id: winner.id,
              wins: Indexes.one.toString(),
              time: winner.timeRace.toString(),
            });
          }
        }
      );
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
