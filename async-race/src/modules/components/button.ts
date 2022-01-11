export const createButton = (data): HTMLButtonElement => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add(data.className);
  button.innerText = data.text.toUpperCase();
  button.onclick = data.handler;

  return button;
};
