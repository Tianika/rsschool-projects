import { Settings } from '../component/Settings'
import { ToyCard } from '../component/ToyCard'
import data from '../data/data'
import { dataToys } from '../interfaces'

export class App {
  start(): void {
    if (!localStorage?.dataForChristmasGame) {
      localStorage.dataForChristmasGame = JSON.stringify(data)
    }
    let gameData: Array<dataToys> = JSON.parse(
      localStorage.dataForChristmasGame
    )

    const settingsView: Settings = new Settings()
    settingsView.draw()

    const toyCards: ToyCard = new ToyCard()
    toyCards.draw(gameData)
  }
}
