import { garage, winners } from '../pages';
import { FIRST_INDEX, Hashes } from '../utils';

export const startApp = (): void => {
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
