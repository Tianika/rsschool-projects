import { Settings } from '../component/Settings'
import { ToyCard } from '../component/ToyCard'
import data from '../data/data'

export class App {
  start(): void {
    const settingsView: Settings = new Settings()
    settingsView.draw()

    const toyCards: ToyCard = new ToyCard()
    console.log(data)
    toyCards.draw(data)
  }
}
