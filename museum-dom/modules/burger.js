export function burgerMenu() {
  const burger = document.querySelector('.burger-icon')
  const menuBurger = document.querySelector('.menu-burger')
  const iconBurger = document.querySelector('.burger-icon')
  const burgerLinks = document.querySelectorAll('.burger-link')
  const welcomeTitle = document.querySelector('.welcome-title')
  const welcomeSubtitle = document.querySelector('.welcome-subtitle')
  const welcomeBtn = document.querySelector('.welcome-button')

  burger.addEventListener('click', function () {
    menuBurger.classList.toggle('burger-hidden')
    iconBurger.classList.toggle('close')
    welcomeTitle.classList.toggle('opacity')
    welcomeSubtitle.classList.toggle('opacity')
    welcomeBtn.classList.toggle('opacity')
  })

  burgerLinks.forEach((link) => {
    link.addEventListener('click', function () {
      menuBurger.classList.toggle('burger-hidden')
      iconBurger.classList.toggle('close')
      welcomeTitle.classList.toggle('opacity')
      welcomeSubtitle.classList.toggle('opacity')
      welcomeBtn.classList.toggle('opacity')
    })
  })
}
