export const classesForHandlers = [
  'home-button',
  'settings-button',
  'button-artist',
  'button-pictures',
  'category-button',
  'timer-pictures',
  'card-image',
  'card-score-button',
]

export const handlers = {
  'home-button': function () {
    home.run()
    person.currentPage = 'home'
  },
  'settings-button': function () {
    settings.run()
  },
  'button-artist': function () {
    categoryArtist.run('artist')
    person.currentPage = 'artist'
  },
  'button-pictures': function () {
    categoryPicture.run('picture')
    person.currentPage = 'picture'
  },
}
