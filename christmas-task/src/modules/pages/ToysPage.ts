import { Header, MainToys, Footer, Settings, ToyCard } from '../component';
import data from '../data/data';

export class ToyPages {
  draw(): void {
    const header: DocumentFragment = Header();
    const mainToys: DocumentFragment = MainToys();
    const footer: DocumentFragment = Footer();

    const root = document.querySelector('.root') as HTMLElement;

    root.appendChild(header);
    root.appendChild(mainToys);
    root.appendChild(footer);

    const settingsView: Settings = new Settings();
    settingsView.draw();

    const toyCards: ToyCard = new ToyCard();
    toyCards.draw(data);
  }
}
