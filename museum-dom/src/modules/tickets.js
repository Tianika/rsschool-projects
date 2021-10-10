export function openForm() {
  const buyBtn = document.querySelector('.button-buy')
  const buyBtnClose = document.querySelector('.buy-ticket-close')
  const ticketsForm = document.querySelector('.buy-tickets-overlay')

  buyBtn.addEventListener('click', function () {
    ticketsForm.classList.remove('buy-tickets-hidden')
  })

  buyBtnClose.addEventListener('click', function () {
    ticketsForm.classList.add('buy-tickets-hidden')
  })

  ticketsForm.addEventListener('click', function (event) {
    if (event.target === ticketsForm) {
      ticketsForm.classList.add('buy-tickets-hidden')
    }
  })
}

export function calculateAmount() {
  const basic = document.querySelector('.button-border.basic input')
  const senior = document.querySelector('.button-border.senior input')
  // const buttonsBasic = document.querySelectorAll('.button-border.basic button')
  // const buttonsSenior = document.querySelectorAll(
  //   '.button-border.senior button'
  // )
  const amount = document.querySelector('.amount-total span')
  const buttons = document.querySelectorAll('.button-border button')

  const radios = document.querySelectorAll('.ticket-radio input')
  let price = 20

  if (localStorage.basicTicketsCount) {
    basic.value = localStorage.basicTicketsCount
  }
  if (localStorage.seniorTicketsCount) {
    senior.value = localStorage.seniorTicketsCount
  }
  if (localStorage.typeTicketsChecked) {
    radios[localStorage.typeTicketsChecked - 1].setAttribute(
      'checked',
      'checked'
    )

    checkRadioBtn(localStorage.typeTicketsChecked)
  }

  addAmount(price)

  function addAmount(price) {
    amount.innerHTML = basic.value * price + (senior.value * price) / 2
  }

  function checkRadioBtn(value) {
    if (value == '1') {
      price = 20
    }
    if (value == '2') {
      price = 25
    }
    if (value == '3') {
      price = 40
    }
  }

  function addLocalStorage() {
    localStorage.basicTicketsCount = basic.value
    localStorage.seniorTicketsCount = senior.value
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      addAmount(price)
      addLocalStorage()
    })
  })

  radios.forEach((radio) => {
    radio.addEventListener('click', () => {
      checkRadioBtn(radio.value)
      addAmount(price)
      localStorage.typeTicketsChecked = radio.value
    })
  })
}

export function validationForm() {
  const date = document.querySelector('.input-form.date')
  const time = document.querySelector('.input-form.time')
  const name = document.querySelector('.input-form.text')
  const email = document.querySelector('.input-form.email')
  const phone = document.querySelector('.input-form.tel')

  function validName() {
    if (name.value.length < 3) {
      console.log('too short')
    }
    if (name.value.length > 15) {
      console.log('too long')
    }

    const number = /\d/.test(name.value)
    if (number) {
      console.log('Need only letters')
    }
  }

  function validEmail() {
    const mail = /^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$/.test(email.value)

    if (!mail) {
      console.log('Need correct email')
    }
  }

  name.addEventListener('input', () => {
    validName()
  })
  email.addEventListener('input', () => {
    validEmail()
  })
}
