import {
  Car,
  CarData,
  CarDataForUpdate,
  DataRace,
  RaceStatus,
  ResponceURLS,
} from '../utils';

export const getCars = async (url: string): Promise<Car[]> => {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
};

export const getCar = async (id: string): Promise<Car> => {
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

export const deleteCar = async (id: string): Promise<void> => {
  await fetch(`${ResponceURLS.garage}/${id}`, {
    method: 'DELETE',
  });

  try {
    const responce = await fetch(`${ResponceURLS.winners}/${id}`);

    if (responce.status === 200) {
      fetch(`${ResponceURLS.winners}/${id}`, {
        method: 'DELETE',
      });
    }
  } catch (error) {
    console.error('Not found: ' + error);
  }
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

export const startEngine = async (id: string): Promise<DataRace> => {
  const responce = await fetch(
    `${ResponceURLS.engine}?id=${id}&status=started`,
    {
      method: 'PATCH',
    }
  );
  const data: Promise<DataRace> = responce.json();

  return data;
};

export const stopEngine = async (id: string): Promise<DataRace> => {
  const responce = await fetch(
    `${ResponceURLS.engine}?id=${id}&status=stopped`,
    {
      method: 'PATCH',
    }
  );
  const data: Promise<DataRace> = responce.json();

  return data;
};

export const drive = async (id: string): Promise<RaceStatus | undefined> => {
  try {
    const responce = await fetch(
      `${ResponceURLS.engine}?id=${id}&status=drive`,
      {
        method: 'PATCH',
      }
    );
    const data: Promise<RaceStatus> = responce.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
