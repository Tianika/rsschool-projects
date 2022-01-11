import {
  createButton,
  createTextInput,
  createColorChoice,
} from '../components';
import { DATA_INPUTS } from '../utiles';

export const createInputBlock = () => {
  const container = document.createElement('div');

  DATA_INPUTS.forEach((data) => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    inputContainer.appendChild(createTextInput(data.textInputClass));
    inputContainer.appendChild(createColorChoice(data.colorInputClass));
    inputContainer.appendChild(createButton(data.btnData));

    container.appendChild(inputContainer);
  });

  return container;
};
