import { Footer } from '../components'

class Settings {
  constructor() {
    this.container = document.querySelector('.root')
  }

  run() {
    let footer = Footer()

    let page = `
        <div class="main-screen settings">
        <header class="header settings-header">
          <button class="close-button arrow"></button>
          <div class="settings-title">Settings</div>
          <button class="close-button close"></button>
        </header>
        <main class="main settings-main">
          <div class="settings-inputs">
            <label for="volume" class="volume"
              >Volume
              <input class="volume-input" type="range" name="volume" id="volume" />
            </label>
            <label for="sounds" class="sounds"
              >Sounds
              <input
                class="sound-switch switch-on ${localStorage['soundMute']}"
                type="checkbox"
                name="sounds"
                id="sounds"
              />
            </label>

            <label for="time-game" class="time-game"
              >Time game
              <input
                class="time-switch switch-on ${localStorage['timerOnOff']}"
                type="checkbox"
                name="time-game"
                id="time-game"
              />
            </label>

            <label for="time-choice" class="time-choice"
              >Time to answer
              <div class="choice-time-buttons">
                <button
                  class="button-general small-button left"
                  type="button"
                >
                  &ndash;
                </button>
                <input
                  class="time-input"
                  type="number"
                  name="time-choice"
                  id="time-choice"
                  min="5"
                  max="30"
                  value="20"
                  step="5"
                  readonly 
                />
                <button
                  type="button"
                  class="button-general small-button right"
                >
                  +
                </button>
              </div>
            </label>
          </div>
          <div class="buttons settings-buttons-container">
            <button class="button-general default-settings">Default</button>
          </div>
        </main>
        ${footer}
      </div>
        `

    this.container.innerHTML = page
  }
}

export default Settings
