export const createPageSubtitle = (countPage: number): HTMLElement => {
  const pageSubtitle = document.createElement('h2');
  pageSubtitle.classList.add('page-subtitle');
  pageSubtitle.innerText = `Page #${countPage}`;

  return pageSubtitle;
};
