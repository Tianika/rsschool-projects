export const createPageSubtitle = (countPage: number): HTMLElement => {
  const subtitleContainer = document.createElement('div');
  subtitleContainer.classList.add('subtitleContainer');

  const pageSubtitle = document.createElement('h2');
  pageSubtitle.classList.add('page-subtitle');
  pageSubtitle.innerText = `Page #${countPage}`;

  subtitleContainer.appendChild(pageSubtitle);

  return subtitleContainer;
};
