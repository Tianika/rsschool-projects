import { createButton, createTextInput, createColorChoice } from '.';
import { DATA_INPUTS } from '../utils';

export const createInputBlock = (): HTMLElement => {
  const container = document.createElement('div');

  DATA_INPUTS.forEach((data) => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    inputContainer.appendChild(
      createTextInput(data.textInputClass, data.state)
    );
    inputContainer.appendChild(
      createColorChoice(data.colorInputClass, data.state)
    );
    inputContainer.appendChild(createButton(data.btnData));

    container.appendChild(inputContainer);
  });

  return container;
};
