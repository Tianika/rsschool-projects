const linksContent = document.querySelector('.links')
let LINKS = [
  {
    href: 'https://learn.javascript.ru/',
    name: 'Learn JS',
  },
  {
    href: 'https://developer.mozilla.org/ru/docs/Web',
    name: 'MDN Web Docs',
  },
  {
    href: 'https://doka.guide/',
    name: 'Doka',
  },
]

if (localStorage['linksList']) {
  LINKS = JSON.parse(localStorage['linksList'])
}

export function addLinksToPage() {
  LINKS.forEach((item) => {
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

export function saveLink() {
  const inputTitle = document.querySelector('#link-name')
  const inputLink = document.querySelector('#link-describe')

  let newInputLink = { href: inputLink.value, name: inputTitle.value }

  if (inputLink.value && inputTitle.value) {
    LINKS.push(newInputLink)
    localStorage['linksList'] = JSON.stringify(LINKS)
    addLink(newInputLink)

    inputTitle.value = ''
    inputLink.value = ''
  }
}

export function removeLink() {
  const inputTitle = document.querySelector('#link-name')

  LINKS.forEach((link, i, arr) => {
    if (link.name === inputTitle.value) {
      LINKS.splice(i, 1)
    }
  })
  console.log(LINKS)

  localStorage['linksList'] = JSON.stringify(LINKS)
  linksContent.innerHTML = ''
  inputTitle.value = ''
  console.log(linksContent)
}
