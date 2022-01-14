import { createCarImage } from '../components';
import { getCar, TABLE_HEADER, Winner } from '../utils';

export const createTable = async (winners: Winner[]): Promise<HTMLElement> => {
  const table = document.createElement('table');
  table.classList.add('winners-table');

  const tr = document.createElement('tr');

  const headers: string[] = Object.keys(TABLE_HEADER);

  headers.forEach((header: string): void => {
    const th = document.createElement('th');
    th.innerText = TABLE_HEADER[header];

    tr.appendChild(th);
  });

  table.appendChild(tr);

  winners.forEach(async (winner: Winner): Promise<void> => {
    const tr = await createRow(winner);
    table.appendChild(tr);
  });

  return table;
};

async function createRow(winner: Winner): Promise<HTMLTableRowElement> {
  const tr = document.createElement('tr');

  const th0 = document.createElement('th');
  th0.innerText = winner.id;
  tr.appendChild(th0);

  const car = await getCar(winner.id);

  const th1 = document.createElement('th');
  th1.appendChild(createCarImage(car.color));
  tr.appendChild(th1);

  const th2 = document.createElement('th');
  th2.innerText = car.name;
  tr.appendChild(th2);

  const th3 = document.createElement('th');
  th3.innerText = winner.wins;
  tr.appendChild(th3);

  const th4 = document.createElement('th');
  th4.innerText = winner.time;
  tr.appendChild(th4);

  return tr;
}
