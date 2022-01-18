export const createColorChoice = (className: string): HTMLInputElement => {
  const input = document.createElement('input');
  input.classList.add('input-color');
  input.classList.add(className);
  input.type = 'color';

  return input;
};

export const createTextInput = (className: string): HTMLInputElement => {
  const input = document.createElement('input');
  input.classList.add('input-text');
  input.classList.add(className);

  return input;
};
