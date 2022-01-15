import { createButton, createTextInput, createColorChoice } from '.';
import { DATA_INPUTS } from '../utils';
import { createInputState, updateInputState } from '../utils/states';

export const createInputBlock = (): HTMLElement => {
  const container = document.createElement('div');

  DATA_INPUTS.forEach((data, index) => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    inputContainer.appendChild(
      createTextInput(data.textInputClass, data.state)
    );

    const colorInput = createColorChoice(data.colorInputClass, data.state);

    if (index === 0) {
      colorInput.value = createInputState.color;
    } else if (index === 1) {
      colorInput.value = updateInputState.color;
    }

    inputContainer.appendChild(colorInput);

    inputContainer.appendChild(createButton(data.btnData));

    container.appendChild(inputContainer);
  });

  return container;
};
