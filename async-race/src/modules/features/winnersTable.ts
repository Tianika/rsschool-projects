import { getCar, getWinners, sortWinnersByTime, sortWinnersByWins } from '.';
import { createCarImage } from '../components';
import {
  commonState,
  DEFAULT_STRING,
  Indexes,
  TABLE_HEADER,
  Winner,
  WinnersSortOrder,
  WinnersSortType,
} from '../utils';

export const createTable = async (winners: Winner[]): Promise<HTMLElement> => {
  const table = document.createElement('table');
  table.classList.add('winners-table');

  const tr = document.createElement('tr');

  const headers: string[] = Object.keys(TABLE_HEADER);

  headers.forEach((header: string, index: number): void => {
    const th = document.createElement('th');
    th.innerText = TABLE_HEADER[header];

    if (index === Indexes.three) {
      th.classList.add('sort-by-wins');
      th.addEventListener('click', sortWinnersByWins);
    }
    if (index === Indexes.four) {
      th.classList.add('sort-by-time');
      th.addEventListener('click', sortWinnersByTime);
    }

    tr.appendChild(th);
  });

  table.appendChild(tr);

  let startIndex = (commonState.pageWinners - 1) * commonState.limitWinners;

  winners.forEach(async (winner: Winner, index: number): Promise<void> => {
    const tr = await createRow(winner, index + startIndex);
    table.appendChild(tr);
  });

  return table;
};

async function createRow(
  winner: Winner,
  index: number
): Promise<HTMLTableRowElement> {
  const tr = document.createElement('tr');

  const th0 = document.createElement('th');
  th0.innerText = (index + Indexes.one).toString();
  tr.appendChild(th0);

  const car = await getCar(winner.id);

  const th1 = document.createElement('th');
  th1.appendChild(createCarImage(car.color));
  tr.appendChild(th1);

  const th2 = document.createElement('th');
  th2.innerText = car.name;
  tr.appendChild(th2);

  const th3 = document.createElement('th');
  th3.innerText = winner.wins.toString();
  tr.appendChild(th3);

  const th4 = document.createElement('th');
  th4.innerText = winner.time.toString();
  tr.appendChild(th4);

  return tr;
}
