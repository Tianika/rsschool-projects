import { START_VALUES, PAGES } from '../../utils';

export class Person {
  constructor() {
    this.soundLevel = START_VALUES.soundLevel;
    this.currentPage = PAGES.home;
  }

  saveCurrentPage(pageName) {
    this.currentPage = pageName;
  }

  loadCurrentPage() {
    return this.currentPage;
  }
}
export default Person;
