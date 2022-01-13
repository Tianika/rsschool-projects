import { garage, winners } from '../pages';
import { DEFAULT_STRING, FIRST_INDEX, Hashes } from '../utils';

export const startApp = (): void => {
  window.location.hash = DEFAULT_STRING;
  garage.draw();

  window.addEventListener('hashchange', (): void => {
    const hash = window.location.hash.slice(FIRST_INDEX);
    console.log(hash);

    if (hash === Hashes.winners) {
      winners.draw();
    } else if (hash === Hashes.garage) {
      garage.draw();
    }
  });
};
