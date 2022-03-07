import {
  DATA_PAGINATION_WINNERS_BTNS,
  PageTitles,
  commonState,
  BtnData,
  WinnersSortType,
  WinnersSortOrder,
  DEFAULT_STRING,
} from '../utils';
import {
  createPageTitle,
  createPageSubtitle,
  createButton,
} from '../components';
import { createTable, getWinners } from '.';

export const winnersMainCreate = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  main.classList.add('main');

  const winners = await getWinners();

  const title = createPageTitle(PageTitles.winners, commonState.countWinners);
  main.appendChild(title);

  const subtitle = createPageSubtitle(commonState.pageWinners);

  DATA_PAGINATION_WINNERS_BTNS.forEach((data: BtnData): void => {
    subtitle.appendChild(createButton(data));
  });

  main.appendChild(subtitle);

  const winnersContainer = document.createElement('div');
  winnersContainer.classList.add('winners-container');

  winnersContainer.appendChild(await createTable(winners));

  main.appendChild(winnersContainer);

  return main;
};

export const sortWinnersByWins = async (): Promise<void> => {
  commonState.winnersSortType = WinnersSortType.wins;

  await sortWinners();

  const button = document.querySelector('.sort-by-wins') as HTMLElement;
  addArrow(button);
};

export const sortWinnersByTime = async (): Promise<void> => {
  commonState.winnersSortType = WinnersSortType.time;

  await sortWinners();

  const button = document.querySelector('.sort-by-time') as HTMLElement;
  addArrow(button);
};

const addArrow = (button: HTMLElement): void => {
  if (commonState.winnersSortOrder === WinnersSortOrder.desc) {
    button.classList.add('arrow-up');
    button.classList.remove('arrow-down');
  } else {
    button.classList.remove('arrow-up');
    button.classList.add('arrow-down');
  }
};

const sortWinners = async () => {
  const winnersContainer = document.querySelector(
    '.winners-container'
  ) as HTMLElement;
  winnersContainer.innerHTML = DEFAULT_STRING;

  const winners = await getWinners();
  winnersContainer.appendChild(await createTable(winners));

  if (commonState.winnersSortOrder === WinnersSortOrder.asc) {
    commonState.winnersSortOrder = WinnersSortOrder.desc;
  } else {
    commonState.winnersSortOrder = WinnersSortOrder.asc;
  }
};
