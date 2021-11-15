import { Footer } from '../components/Footer'

class Settings {
  constructor() {
    this.container = document.querySelector('.root')
  }

  async run() {
    let footer = await Footer.render()
    console.log(Footer)
    let page = {
      render: async () => {
        return /*html*/ `
        <div class="main-screen settings">
        <header class="header settings-header">
          <button class="close-button arrow"></button>
          <div class="settings-title">Setting</div>
          <button class="close-button close"></button>
        </header>
        <main class="main settings-main">
          <div class="settings-inputs">
            <label for="volume" class="volume"
              >Volume
              <input type="range" name="volume" id="volume" />
            </label>
            <label for="sounds" class="sounds"
              >Sounds
              <input
                class="switch-on switch-off"
                type="checkbox"
                name="sounds"
                id="sounds"
              />
            </label>

            <label for="time-game" class="time-game"
              >Time game
              <input
                class="switch-on switch-off"
                type="checkbox"
                name="time-game"
                id="time-game"
              />
            </label>

            <label for="time-choice" class="time-choice"
              >Time to answer
              <div class="choice-time-buttons">
                <button
                  class="button-general small"
                  type="button"
                  onclick="this.nextElementSibling.stepDown()"
                >
                  &ndash;
                </button>
                <input
                  type="number"
                  name="time-choice"
                  id="time-choice"
                  min="5"
                  max="30"
                  value="20"
                  step="5"
                />
                <button
                  type="button"
                  class="button-general small"
                  onclick="this.previousElementSibling.stepUp()"
                >
                  +
                </button>
              </div>
            </label>
          </div>
          <div class="buttons settings-buttons">
            <button class="button-general default-settings">Default</button>
            <button class="button-general save-settings">Save</button>
          </div>
        </main>
        ${footer}
      </div>
        `
      },
      after_render: async () => {},
    }
    this.container.innerHTML = await page.render()
  }
}

export default Settings
