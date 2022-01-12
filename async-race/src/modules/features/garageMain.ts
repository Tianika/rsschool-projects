import { createPageSubtitle } from '../components';
import { createPageTitle } from '../components/pageTitle';
import { Car } from '../utils';
import { createCarItem } from './carItem';

export const garageMainCreate = (): HTMLElement => {
  const main = document.createElement('main');
  main.classList.add('main');

  const title = createPageTitle('Garage', 9);
  main.appendChild(title);

  const subtitle = createPageSubtitle(1);
  main.appendChild(subtitle);

  const carsContainer = document.createElement('div');
  carsContainer.classList.add('cars-container');

  Promise.resolve(getCars('http://127.0.0.1:3000/garage')).then(
    (cars: Array<Car>): void =>
      cars.forEach((car: Car): void => {
        carsContainer.appendChild(createCarItem(car));
      })
  );

  main.appendChild(carsContainer);

  return main;
};

async function getCars(url: string) {
  const responce = await fetch(url);
  const data = await responce.json();

  return data;
}
