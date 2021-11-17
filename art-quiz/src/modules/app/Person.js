export class Person {
  constructor() {
    this.soundLevel = 30
    this.currentPage = 'home'
  }

  saveCurrentPage(pageName) {
    this.currentPage = pageName
  }

  loadCurrentPage() {
    return this.currentPage
  }
}
export default Person
