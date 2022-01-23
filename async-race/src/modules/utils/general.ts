import { HEX_CODE, Indexes, LinkData, commonState } from '.';
import { carBrands, carModels } from '../data';
import { getCar } from '../features';

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

export const changeTitle = (number: number): void => {
  const title = document.querySelector('.garage-title') as HTMLElement;
  title.innerHTML = `Garage (${number})`;
};

export const randomNumber = (length: number): number => {
  return Math.floor(Math.random() * length);
};

export const generateName = (): string => {
  const brand = carBrands[randomNumber(carBrands.length)];
  const model = carModels[randomNumber(carModels.length)];

  return `${brand} ${model}`;
};

export const generateColor = (): string => {
  const color: string[] = [];

  for (let i = 0; i < 6; i++) {
    color.push(HEX_CODE[randomNumber(HEX_CODE.length)]);
  }

  return `#${color.join('')}`;
};

export const changeSubtitle = (page: number): void => {
  const subtitle = document.querySelector('.page-subtitle') as HTMLElement;

  subtitle.innerText = `Page #${page}`;
};

export const checkCarsPaginationBtn = (): void => {
  const prevBtn = document.querySelector(
    '.prev-cars-button'
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector(
    '.next-cars-button'
  ) as HTMLButtonElement;

  const maxPages = Math.ceil(commonState.countCars / commonState.limitGarage);

  if (commonState.pageGarage < maxPages) {
    nextBtn.classList.add('active');
  } else {
    nextBtn.classList.remove('active');
  }

  if (commonState.pageGarage > Indexes.one) {
    prevBtn.classList.add('active');
  } else {
    prevBtn.classList.remove('active');
  }
};

export const checkWinnersPaginationBtn = (): void => {
  const prevBtn = document.querySelector(
    '.prev-winners-button'
  ) as HTMLButtonElement;
  const nextBtn = document.querySelector(
    '.next-winners-button'
  ) as HTMLButtonElement;

  const maxPages = Math.ceil(
    commonState.countWinners / commonState.limitWinners
  );

  if (commonState.pageWinners < maxPages) {
    nextBtn.classList.add('active');
  } else {
    nextBtn.classList.remove('active');
  }

  if (commonState.pageWinners > Indexes.one) {
    prevBtn.classList.add('active');
  } else {
    prevBtn.classList.remove('active');
  }
};

export const getId = (event: Event): number => {
  const target = event.target as HTMLElement;
  const id = target.dataset.id as string;

  return +id;
};

export const addActiveClass = (
  className: string,
  scope: HTMLElement | Document = document
): void => {
  const element = scope.querySelector(`.${className}`) as HTMLButtonElement;
  element.classList.add('active');
};

export const removeActiveClass = (
  className: string,
  scope: HTMLElement | Document = document
): void => {
  const element = scope.querySelector(`.${className}`) as HTMLButtonElement;
  element.classList.remove('active');
};

export const showWinnerMsg = async (
  id: number,
  timeRace: number
): Promise<void> => {
  const winner = await getCar(id);

  const name = document.querySelector('.name-winner') as HTMLElement;
  name.innerText = winner.name;

  const time = document.querySelector('.time-winner') as HTMLElement;
  time.innerText = (timeRace / 1000).toFixed(2);

  addActiveClass('winner-msg');
};

export const activeSound = (event: Event | undefined): void => {
  if (event) {
    const target = event.target as HTMLButtonElement;

    target.classList.toggle('active');
    if (target.classList.contains('active')) {
      commonState.audio.play();
      commonState.audioIsPlay = true;
    } else {
      commonState.audio.pause();
      commonState.audioIsPlay = false;
    }
  }
};

export const checkAudioPlay = () => {
  const audioBtn = document.querySelector('.sound-button') as HTMLButtonElement;
  commonState.audio.loop = true;

  if (commonState.audioIsPlay) {
    audioBtn.classList.add('active');
  }
};
