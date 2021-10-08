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
    pictureInnerContainer.append(img)
  })
}
