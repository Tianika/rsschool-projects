import { createButton, createCarImage } from '../components';
import { Car, DATA_CAR_BTNS, DATA_ENGINE_BTNS } from '../utils';

export const createCarItem = (car: Car): HTMLElement => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car-item');

  const carItemHeader = document.createElement('div');
  carItemHeader.classList.add('car-item-title');

  DATA_CAR_BTNS.forEach((data): void => {
    carItemHeader.appendChild(createButton(data));
  });

  const carItemTitle = document.createElement('h3');
  carItemTitle.classList.add('car-name');
  carItemTitle.innerText = car.name;
  carItemHeader.appendChild(carItemTitle);

  carContainer.appendChild(carItemHeader);

  const carItemRace = document.createElement('div');
  carItemRace.classList.add('car-item-race');

  DATA_ENGINE_BTNS.forEach((data) => {
    carItemRace.appendChild(createButton(data));
  });

  const carIcon = createCarImage(car.color);
  carItemRace.appendChild(carIcon);

  const finish = document.createElement('div');
  finish.classList.add('finish');
  carItemRace.appendChild(finish);

  carContainer.appendChild(carItemRace);

  return carContainer;
};
