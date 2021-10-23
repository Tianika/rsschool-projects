const linksContent = document.querySelector('.links')

export async function addLinksToPage() {
  const LINKS = `../assets/json/links.json`
  const responce = await fetch(LINKS)
  const data = await responce.json()

  data.forEach((item) => {
    addLink(item)
  })
}

export function addLink(link) {
  let p = document.createElement('p')
  p.classList.add('link-style')
  let newLink = document.createElement('a')
  newLink.innerHTML = `<a href=${link.href} target="_blank">${link.name}</a>`

  p.append(newLink)
  linksContent.append(p)
}
