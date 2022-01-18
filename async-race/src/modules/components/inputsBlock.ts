import { createButton, createTextInput, createColorChoice } from '.';
import { DATA_INPUTS, Indexes } from '../utils';
import { createInputState, updateInputState } from '../utils/states';

export const createInputBlock = (): HTMLElement => {
  const container = document.createElement('div');

  DATA_INPUTS.forEach((data, index): void => {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const textInput = createTextInput(data.textInputClass);

    if (index === Indexes.zero) {
      textInput.value = createInputState.name;
      textInput.addEventListener('change', (): void => {
        createInputState.name = textInput.value;
      });
    } else if (index === Indexes.one) {
      textInput.value = updateInputState.name;
      textInput.addEventListener('change', (): void => {
        updateInputState.name = textInput.value;
      });
    }

    inputContainer.appendChild(textInput);

    const colorInput = createColorChoice(data.colorInputClass);

    if (index === Indexes.zero) {
      colorInput.value = createInputState.color;
      colorInput.addEventListener('change', (): void => {
        createInputState.color = colorInput.value;
      });
    } else if (index === Indexes.one) {
      colorInput.value = updateInputState.color;
      colorInput.addEventListener('change', (): void => {
        updateInputState.color = colorInput.value;
      });
    }

    inputContainer.appendChild(colorInput);
    inputContainer.appendChild(createButton(data.btnData));

    container.appendChild(inputContainer);
  });

  return container;
};
