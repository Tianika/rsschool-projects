import { garage, winners } from '../pages';
import { DEFAULT_STRING, Hashes, Indexes } from '../utils';

export const startApp = (): void => {
  window.location.hash = DEFAULT_STRING;
  garage.draw();

  window.addEventListener('hashchange', (): void => {
    const hash = window.location.hash.slice(Indexes.one);

    if (hash === Hashes.winners) {
      winners.draw();
    } else if (hash === Hashes.garage) {
      garage.draw();
    }
  });
};
