import { Header, MainTree, Footer } from '../component';

export class MainPage {
  draw(): void {
    const header: DocumentFragment = Header();
    const main: DocumentFragment = MainTree();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;

    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);

    const mainElem = document.querySelector('.main') as HTMLElement;
    const headerElem = document.querySelector('.header') as HTMLElement;

    mainElem.classList.add('main-tree');
    headerElem.classList.add('header-tree');
  }
}

export default MainPage;
