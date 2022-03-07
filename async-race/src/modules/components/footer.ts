import { DATA_FOOTER, createLink } from '../utils';

export const createFooter = (): HTMLElement => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const year = document.createElement('div');
  year.classList.add('copyright-year');
  year.innerHTML = DATA_FOOTER.year;
  footer.appendChild(year);

  const linkAuthor = createLink(DATA_FOOTER.target, DATA_FOOTER.author);
  footer.appendChild(linkAuthor);

  const linkSchool = createLink(DATA_FOOTER.target, DATA_FOOTER.school);
  footer.appendChild(linkSchool);

  return footer;
};
