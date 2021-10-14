export function greetingView() {
  const welcome = document.querySelector('.greeting')
  const name = document.querySelector('.name')

  welcome.innerText = 'Good night'
  let savedName = localStorage['nameForMomentum']

  function checkName() {
    name.value = savedName ? savedName : ''
  }

  name.addEventListener('input', () => {
    localStorage['nameForMomentum'] = name.value
  })

  checkName()
}
