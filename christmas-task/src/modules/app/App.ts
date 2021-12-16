import { Settings } from '../component/Settings';
import { ToyCard } from '../component/ToyCard';
import data from '../data/data';
import { dataToys } from '../utils/interfaces';

export class App {
  start(): void {
    const settingsView: Settings = new Settings();
    settingsView.draw();

    const toyCards: ToyCard = new ToyCard();
    toyCards.draw(data);
  }
}
