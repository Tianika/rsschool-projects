export function randomImage() {
  const images = [
    './assets/img/galery/galery1.jpg',
    './assets/img/galery/galery2.jpg',
    './assets/img/galery/galery3.jpg',
    './assets/img/galery/galery4.jpg',
    './assets/img/galery/galery5.jpg',
    './assets/img/galery/galery6.jpg',
    './assets/img/galery/galery7.jpg',
    './assets/img/galery/galery8.jpg',
    './assets/img/galery/galery9.jpg',
    './assets/img/galery/galery10.jpg',
    './assets/img/galery/galery11.jpg',
    './assets/img/galery/galery12.jpg',
    './assets/img/galery/galery13.jpg',
    './assets/img/galery/galery14.jpg',
    './assets/img/galery/galery15.jpg',
  ]
  images.sort(() => Math.random() - 0.5)

  const pictureInnerContainer = document.querySelector(
    '.picture-inner-container'
  )
  images.forEach((image) => {
    const img = document.createElement('img')
    img.src = `${image}`
    img.alt = `galery image`
    img.classList.add('animated')
    pictureInnerContainer.append(img)
  })
}

export function animationScroll() {
  const animatedItems = document.querySelectorAll('.animated')

  if (animatedItems.length > 0) {
    window.addEventListener('scroll', animatedScroll)

    function animatedScroll() {
      animatedItems.forEach((item) => {
        const itemHeight = item.offsetHeight
        const itemOffset = offset(item).top
        const start = 10

        let point = window.innerHeight - itemHeight / start

        if (itemHeight > window.innerHeight) {
          point = window.innerHeight - window.innerHeight / start
        }

        if (pageYOffset > itemOffset - point) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      })
    }

    function offset(item) {
      const rect = item.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      return { top: rect.top + scrollTop }
    }

    animatedScroll()
  }
}
