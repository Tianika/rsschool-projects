export function exploreSlider() {
  let sliderInput = document.querySelector('.explore-slider input')
  let sliderImage = document.querySelector('.original-image')

  sliderInput.addEventListener('input', function () {
    sliderImage.style.width = this.value + '%'
    sliderInput.style.backgroundPosition = this.value + '%'
  })
}
