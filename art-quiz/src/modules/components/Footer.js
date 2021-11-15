export let Footer = {
  render: async () => {
    return /*html*/ ` 
      <footer class="footer">
        <div class="logo-rsschool">
          <a href="https://rs.school/js/" target="_blank"></a>
        </div>
        <div class="app-developer">
          <a href="https://github.com/Tianika" target="_blank">Tianika</a>
        </div>
        <div class="app-year">2021</div>
      </footer>
  `
  },
  afterrender: () => {},
}

export default Footer
