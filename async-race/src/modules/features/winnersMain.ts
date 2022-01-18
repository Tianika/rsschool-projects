import {
  DATA_PAGINATION_WINNERS_BTNS,
  PageTitles,
  ResponceURLS,
  Winner,
  commonState,
  BtnData,
} from '../utils';
import {
  createPageTitle,
  createPageSubtitle,
  createButton,
} from '../components';
import { createTable } from '.';

export async function getWinners(url: string): Promise<Winner[]> {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
}

export const winnersMainCreate = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  main.classList.add('main');

  const winners = await getWinners(
    `${ResponceURLS.winners}?_page=${commonState.pageWinners}&_limit=${commonState.limitWinners}`
  );

  const title = createPageTitle(PageTitles.winners, winners.length);
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
