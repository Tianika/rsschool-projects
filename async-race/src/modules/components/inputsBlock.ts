import { createButton, createTextInput, createColorChoice } from '.';
import {
  DATA_INPUTS,
  createInputState,
  updateInputState,
  Indexes,
} from '../utils';

export const createInputBlock = (): HTMLElement => {
  const container = document.createElement('div');

  DATA_INPUTS.forEach((data, index): void => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    inputContainer.appendChild(
      createTextInput(data.textInputClass, data.state)
    );

    const colorInput = createColorChoice(data.colorInputClass, data.state);

    if (index === Indexes.zero) {
      colorInput.value = createInputState.color;
    } else if (index === Indexes.one) {
      colorInput.value = updateInputState.color;
    }

    inputContainer.appendChild(colorInput);

    inputContainer.appendChild(createButton(data.btnData));

    container.appendChild(inputContainer);
  });

  return container;
};
