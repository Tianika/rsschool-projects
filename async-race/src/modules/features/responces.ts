import { Car, CarData, ResponceURLS } from '../utils';

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
      await fetch(`${ResponceURLS.winners}/${id}`, {
        method: 'DELETE',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
