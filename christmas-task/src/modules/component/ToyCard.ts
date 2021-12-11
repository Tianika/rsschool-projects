export class ToyCard {
  draw(data: []): void {
    const fragment = document.createDocumentFragment()
    const toyCardTemp: HTMLTemplateElement | null =
      document.querySelector('#toyCardTemp')

    data.forEach((element) => {
      if (!toyCardTemp) return
      const newsClone = toyCardTemp.content.cloneNode(true)

      console.log(newsClone)

      newsClone.querySelector('.toy-card-title').textContent = element.name
      newsClone.querySelector(
        '.toy-card-image'
      ).src = `./assets/toys/${element.num}.png`
      newsClone.querySelector(
        '.describe-content.count'
      ).textContent = `Количество: ${element.count}`
      newsClone.querySelector(
        '.describe-content.year'
      ).textContent = `Год покупки: ${element.year}`
      newsClone.querySelector(
        '.describe-content.shape'
      ).textContent = `Форма: ${element.shape}`
      newsClone.querySelector(
        '.describe-content.color'
      ).textContent = `Цвет: ${element.color}`
      newsClone.querySelector(
        '.describe-content.size'
      ).textContent = `Размер: ${element.size}`
      newsClone.querySelector(
        '.describe-content.favorite'
      ).textContent = `Любимая: ${element.favorite ? 'Да' : 'Нет'}`

      fragment.append(newsClone)
    })

    const toyContainer: HTMLElement | null =
      document.querySelector('.toys-container')

    if (!toyContainer) return

    toyContainer.innerHTML = ''
    toyContainer.appendChild(fragment)
  }
}
