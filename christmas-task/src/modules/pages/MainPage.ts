import { Header, Main, Footer } from '../component';
import { DEFAULT_STRING_FOR_INNER_HTML } from '../utils';

class MainPage {
  draw(): void {
    const header: DocumentFragment = Header();
    const main: DocumentFragment = Main();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;
    root.innerHTML = DEFAULT_STRING_FOR_INNER_HTML;

    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);

    const mainElem = document.querySelector('.main') as HTMLElement;
    const headerElem = document.querySelector('.header') as HTMLElement;

    mainElem.classList.add('main-page');
    headerElem.classList.add('main-header');
  }
}

export default MainPage;
