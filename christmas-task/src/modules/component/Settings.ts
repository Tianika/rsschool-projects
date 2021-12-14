import { Slider } from './Slider'
import {
  sortingFromFirstLetter,
  sortingFromLastLetter,
  newOnesFirst,
  oldOnesFirst,
} from '../utils/sort'
import data from '../data/data'
import { ToyCard } from './ToyCard'

export class Settings {
  slider: Slider

  constructor() {
    this.slider = new Slider()
  }

  draw(): void {
    if (this.slider) this.slider.draw()

    const favoriteChoice = document.querySelector(
      '.favorite-choice-item'
    ) as HTMLInputElement

    favoriteChoice.addEventListener('change', () => {
      const toyCards = document.querySelectorAll('.toy-card')

      if (favoriteChoice.checked) {
        toyCards.forEach((card, index) => {
          if (card.getAttribute('data-favorite') == 'false') {
            card.classList.add('hidden')
            setTimeout(() => {
              card.classList.add('remove')
            }, 330)
          }
        })
      } else {
        toyCards.forEach((card) => {
          card.classList.remove('remove')
          setTimeout(() => {
            card.classList.remove('hidden')
          }, 330)
        })
      }
    })

    const selectSortType = document.querySelector(
      '.sort-choice'
    ) as HTMLSelectElement

    selectSortType?.addEventListener('change', function () {
      const index = this.selectedIndex
      let sortData = JSON.parse(JSON.stringify(data))

      switch (index) {
        case 0:
          sortData = data
          break
        case 1:
          sortData = sortingFromFirstLetter(sortData)
          break
        case 2:
          sortData = sortingFromLastLetter(sortData)
          break
        case 3:
          sortData = newOnesFirst(sortData)
          break
        case 4:
          sortData = oldOnesFirst(sortData)
          break
      }

      localStorage.dataForChristmasGame = JSON.stringify(sortData)

      const toyCard = new ToyCard()
      toyCard.draw(sortData)
    })

    const defaultButton = document.querySelector(
      '.default-settings-button'
    ) as HTMLButtonElement

    defaultButton.addEventListener('click', (): void => {
      localStorage.dataForChristmasGame = JSON.stringify(data)

      const toyCard = new ToyCard()
      toyCard.draw(JSON.parse(localStorage.dataForChristmasGame))
    })
  }
}
