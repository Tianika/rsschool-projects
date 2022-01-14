import { CarData } from '../utils';

export const createTextInput = (
  className: string,
  state: CarData
): HTMLInputElement => {
  const input = document.createElement('input');
  input.classList.add('input-text');
  input.classList.add(className);

  input.addEventListener('change', () => (state.name = input.value));

  return input;
};
