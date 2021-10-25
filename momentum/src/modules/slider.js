//https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=VgeZavA1Tb6SG4AWyyhuSVWUyqs5WWaN8fN1jcHyGY0
//https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19c7c0645a84f349b12219623e186297&tags=nature&extras=url_l&format=json&nojsoncallback=1
export function getRandomNum() {
  let randomNum = Math.ceil(Math.random() * 20)

  return randomNum
}

export async function setBg(time, number) {
  const body = document.querySelector('body')
  const sources = document.querySelectorAll('.image-input')
  let imageSource = 'github'
  let link = `https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${time}/${number
    .toString()
    .padStart(2, '0')}.jpg`

  const imgBg = new Image()

  sources.forEach((source) => {
    if (source.checked) {
      imageSource = source.id
    }
  })

  if (imageSource === 'github') {
    link = `https://raw.githubusercontent.com/Tianika/stage1-tasks/assets/images/${time}/${number
      .toString()
      .padStart(2, '0')}.jpg`
  }
  if (imageSource === 'flickr') {
    link = await getLinkFlickr(time)
  }
  if (imageSource === 'unsplash') {
    link = await getLinkUnspash(time)
  }

  imgBg.src = await link

  imgBg.addEventListener(
    'load',
    () => (body.style.backgroundImage = `url(${link})`)
  )
}

async function getLinkFlickr(query) {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=19c7c0645a84f349b12219623e186297&tags=${query}&tags=${localStorage['imageKeyword']}&extras=url_l&format=json&nojsoncallback=1&content_type=1&per_page=5`

  const responce = await fetch(url)
  const data = await responce.json()

  return data.photos.photo[Math.round(Math.random() * 5)].url_l
}

async function getLinkUnspash(query) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${localStorage['imageKeyword']}&${query}&client_id=VgeZavA1Tb6SG4AWyyhuSVWUyqs5WWaN8fN1jcHyGY0`

  const responce = await fetch(url)
  const data = await responce.json()

  return data.urls.regular
}

export function getNextSlide(num) {
  if (num === 20) {
    num = 1
  } else {
    num++
  }

  return num
}

export function getPrevSlide(num) {
  if (num === 1) {
    num = 20
  } else {
    num--
  }

  return num
}
