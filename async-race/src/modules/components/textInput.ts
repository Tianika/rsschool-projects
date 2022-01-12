export const createTextInput = (className: string): HTMLInputElement => {
  const input = document.createElement('input');
  input.classList.add('input-text');
  input.classList.add(className);

  return input;
};
