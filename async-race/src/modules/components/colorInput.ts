import { CarData } from '../utils';

export const createColorChoice = (
  className: string,
  state: CarData
): HTMLInputElement => {
  const input = document.createElement('input');
  input.classList.add('input-color');
  input.classList.add(className);
  input.type = 'color';

  input.addEventListener('change', (): string => (state.color = input.value));

  return input;
};
