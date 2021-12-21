import { ToyPages } from '../pages/ToysPage';

export class App {
  start(): void {
    const toyPage: ToyPages = new ToyPages();

    toyPage.draw();
  }
}
