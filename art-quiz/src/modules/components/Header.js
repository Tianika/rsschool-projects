export const Header = () => {
  const component = ` 
        <header class="header select-header">
        <div class="title"><span class="color-name">Art</span> Quiz</div>
        <div class="title-small"><span class="color-name">A</span>Q</div>
          <div class="buttons buttons-header">
            <button class="button-general button-header home-button">
              Home
            </button>
            <button class="button-general button-header timer-button">
              Timer
            </button>
            <button class="button-general button-header category-button">
              Categories
            </button>
          </div>
          <button class="settings-button"></button>
        </header>
  `
  return component
}
export default Header
