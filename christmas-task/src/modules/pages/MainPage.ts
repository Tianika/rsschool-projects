import { Header, Main, Footer } from '../component';

export class MainPage {
  draw(): void {
    const header: DocumentFragment = Header();
    const main: DocumentFragment = Main();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;

    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);

    const mainA = document.querySelector('.main') as HTMLElement;
    const headerA = document.querySelector('.header') as HTMLElement;

    mainA.classList.add('main-page');
    headerA.classList.add('main-header');
  }
}

export default MainPage;
