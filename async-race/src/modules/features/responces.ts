import {
  Car,
  CarData,
  CarDataForUpdate,
  commonState,
  DataForUpdateWinner,
  DataRace,
  RaceStatus,
  ResponceURLS,
  status,
  UpdateWinner,
  Winner,
} from '../utils';

export const getCars = async (url: string): Promise<Car[]> => {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
};

export const getCar = async (id: number): Promise<Car> => {
  const responce = await fetch(`${ResponceURLS.garage}/${id}`);
  const data = await responce.json();

  return data;
};

export const createCar = async (car: CarData): Promise<Car> => {
  const responce = await fetch(ResponceURLS.garage, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Promise<Car> = responce.json();

  return data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${ResponceURLS.garage}/${id}`, {
    method: 'DELETE',
  });

  deleteWinner(id);
};

export const updateCar = async (car: CarDataForUpdate): Promise<void> => {
  await fetch(`${ResponceURLS.garage}/${car.id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const startEngine = async (id: number): Promise<DataRace> => {
  const responce = await fetch(
    `${ResponceURLS.engine}?id=${id}&status=started`,
    {
      method: 'PATCH',
    }
  );
  const data: Promise<DataRace> = responce.json();

  return data;
};

export const stopEngine = async (id: number): Promise<DataRace> => {
  const responce = await fetch(
    `${ResponceURLS.engine}?id=${id}&status=stopped`,
    {
      method: 'PATCH',
    }
  );
  const data: Promise<DataRace> = responce.json();

  return data;
};

export const drive = async (id: number): Promise<RaceStatus | undefined> => {
  const responce = await fetch(`${ResponceURLS.engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  const data: Promise<RaceStatus> = responce.json();

  return data;
};

export const getWinners = async (): Promise<Winner[]> => {
  const url = `${ResponceURLS.winners}?_page=${commonState.pageWinners}&_limit=${commonState.limitWinners}&_sort=${commonState.winnersSortType}&_order=${commonState.winnersSortOrder}`;
  const responce = await fetch(url);

  const winnersCount = responce.headers.get('X-Total-Count');
  if (winnersCount) {
    commonState.countWinners = +winnersCount;
  }

  const data = await responce.json();

  return data;
};

export const getWinner = async (id: number): Promise<Winner | null> => {
  const responce = await fetch(`${ResponceURLS.winners}/${id}`);
  let data: Winner | null;

  if (responce.status === status.ok) {
    data = await responce.json();
  } else {
    data = null;
  }

  return data;
};

export const createWinner = async (winner: UpdateWinner) => {
  const responce = await fetch(ResponceURLS.winners, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await responce.json();

  return data;
};

export const updateWinner = async (
  id: number,
  winner: DataForUpdateWinner
): Promise<void> => {
  const responce = await fetch(`${ResponceURLS.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await responce.json();

  return data;
};

export const deleteWinner = async (id: number): Promise<void> => {
  fetch(`${ResponceURLS.winners}/${id}`, {
    method: 'DELETE',
  });
};
