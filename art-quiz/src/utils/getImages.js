export async function getImages() {
  const imagesPath = `../assets/data/images.json`
  const responce = await fetch(imagesPath)
  const images = await responce.json()

  return images
}
