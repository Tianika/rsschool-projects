import { Car, LinkData, ResponceURLS } from '.';

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

export const getCars = async (url: string): Promise<Car[]> => {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
};

export const getCar = async (id: string) => {
  console.log(`${ResponceURLS.garage}/${id}`);
  const responce = await fetch(`${ResponceURLS.garage}/${id}`);
  const data = await responce.json();

  return data;
};
