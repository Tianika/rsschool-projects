import { Settings } from '../component/Settings'

export class App {
  start(): void {
    const settingsView: Settings = new Settings()
    settingsView.draw()
  }
}
