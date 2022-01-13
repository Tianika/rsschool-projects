import { LimitCars, PageTitles, ResponceURLS, Winner } from '../utils';
import { createPageTitle, createPageSubtitle } from '../components';
import { createTable } from '.';

export const winnersMainCreate = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  main.classList.add('main');

  const page = 1;

  const winners = await getWinners(
    `${ResponceURLS.winners}?_page=${page}&_limit=${LimitCars.forWinners}`
  );

  const title = createPageTitle(PageTitles.winners, winners.length);
  main.appendChild(title);

  const subtitle = createPageSubtitle(page);
  main.appendChild(subtitle);

  const winnersContainer = document.createElement('div');
  winnersContainer.classList.add('winners-container');

  winners.forEach((winner): void => {
    console.log(winner);
  });

  winnersContainer.appendChild(await createTable(winners));

  main.appendChild(winnersContainer);

  return main;
};

async function getWinners(url: string): Promise<Winner[]> {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
}
