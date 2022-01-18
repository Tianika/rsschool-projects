import { createButton, createCarImage } from '../components';
import { BtnData, Car, DATA_CAR_BTNS, DATA_ENGINE_BTNS } from '../utils';

export const createCarItem = (car: Car): HTMLElement => {
  const carId = car.id.toString();

  const carContainer = document.createElement('div');
  carContainer.classList.add('car-item');
  carContainer.classList.add(`car${carId}`);
  carContainer.dataset.id = carId;

  const carItemHeader = document.createElement('div');
  carItemHeader.classList.add('car-item-title');

  DATA_CAR_BTNS.forEach((data: BtnData): void => {
    const button = createButton(data);
    button.dataset.id = carId;
    carItemHeader.appendChild(button);
  });

  const carItemTitle = document.createElement('h3');
  carItemTitle.classList.add('car-name');
  carItemTitle.innerText = car.name;
  carItemHeader.appendChild(carItemTitle);

  const carItemError = document.createElement('span');
  carItemError.classList.add('car-error');
  carItemError.innerText = 'is broken';
  carItemHeader.appendChild(carItemError);

  carContainer.appendChild(carItemHeader);

  const carItemRace = document.createElement('div');
  carItemRace.classList.add('car-item-race');

  DATA_ENGINE_BTNS.forEach((data: BtnData): void => {
    const button = createButton(data);
    button.dataset.id = carId;
    carItemRace.appendChild(button);
  });

  const carIcon = createCarImage(car.color);
  carItemRace.appendChild(carIcon);

  const finish = document.createElement('div');
  finish.classList.add('finish');
  carItemRace.appendChild(finish);

  carContainer.appendChild(carItemRace);

  return carContainer;
};
