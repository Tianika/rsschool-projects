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
  }
}

export default MainPage;
