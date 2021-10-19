function randomNumber(arr) {
  return Math.floor(Math.random() * arr.length)
}

export async function getQuotes() {
  const quote = document.querySelector('.quote')
  const author = document.querySelector('.author')

  const quotes = '../assets/json/quotes-en.json'
  const responce = await fetch(quotes)
  const data = await responce.json()

  let quoteNum = randomNumber(data)

  quote.textContent = `${data[quoteNum]['quote']}`
  author.textContent = `${data[quoteNum]['author']}`
}

getQuotes()
