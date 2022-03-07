export const createPageTitle = (
  title: string,
  countCars: number
): HTMLElement => {
  const pageTitle = document.createElement('h1');
  pageTitle.classList.add('page-title');
  pageTitle.classList.add('garage-title');
  pageTitle.innerText = `${title} (${countCars})`;

  return pageTitle;
};
