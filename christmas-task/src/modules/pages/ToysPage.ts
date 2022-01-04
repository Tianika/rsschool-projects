import { Header, MainToys, Footer, Settings, ToyCard } from '../component';
import data from '../data';
import { DEFAULT_STRING_FOR_INNER_HTML } from '../utils';

class ToysPage {
  draw(): void {
    const header: DocumentFragment = Header();
    const mainToys: DocumentFragment = MainToys();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;
    root.innerHTML = DEFAULT_STRING_FOR_INNER_HTML;

    root.appendChild(header);
    root.appendChild(mainToys);
    root.appendChild(footer);

    const toyCards = new ToyCard();
    toyCards.draw(data);

    const settingsView = new Settings();
    settingsView.draw();
  }
}

export default ToysPage;
