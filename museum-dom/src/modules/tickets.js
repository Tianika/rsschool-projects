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

//amount price tickets

export function calculateAmount() {
  const basic = document.querySelector('.button-border.basic input')
  const senior = document.querySelector('.button-border.senior input')
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

//booking form

export function calcAmountBooking() {
  const buttonBuy = document.querySelector('.button-buy')

  const basicPrice = document.querySelector('.ticket-name.basic span')
  const seniorPrice = document.querySelector('.ticket-name.senior span')
  const basicPriceOverview = document.querySelector(
    '.booking-total-name.basic span'
  )
  const seniorPriceOverview = document.querySelector(
    '.booking-total-name.senior span'
  )

  const buttons = document.querySelectorAll('.button-number button')

  const basicValue = document.querySelector('.button-number.basic .number')
  const seniorValue = document.querySelector('.button-number.senior .number')

  const dateInput = document.querySelector('.input-form.date')
  const dateText = document.querySelector('.overview-text.date')

  const amounts = document.querySelectorAll('.booking-total-sum span')
  const totalAmount = document.querySelector('.total-amount-sum')
  const ticketsOverview = document.querySelectorAll('.ticket-count')

  const typeTicketField = document.querySelector('.input-form')
  const typeTicketCheck = document.querySelectorAll('.select-ticket-type')
  const typeExhibition = document.querySelector('.overview-text.temporary')

  let price = 20
  let typeTicket = '1'
  let typeText = 'Permanent exhibition'

  checkLocalValue()
  addPrice()
  addAmount()
  setTicketType()
  addTicketType()

  function checkLocalValue() {
    if (localStorage.basicTicketsCount) {
      basicValue.value = localStorage.basicTicketsCount
    }
    if (localStorage.seniorTicketsCount) {
      seniorValue.value = localStorage.seniorTicketsCount
    }
    if (localStorage.typeTicketsChecked) {
      let type = localStorage.typeTicketsChecked

      setPrice(type)
    }
  }

  function setPrice(type) {
    if (type === '1') {
      typeTicket = '1'
      typeText = 'Permanent exhibition'
      price = 20
    }
    if (type === '2') {
      typeTicket = '2'
      typeText = 'Temporary exhibition'
      price = 25
    }
    if (type === '3') {
      typeTicket = '3'
      typeText = 'Combined Admission'
      price = 40
    }
  }

  function setTicketType() {
    typeTicketCheck.forEach((type) => {
      type.removeAttribute('selected')
      if (type.value === typeTicket) {
        type.setAttribute('selected', 'selected')
      }
    })
  }

  function addTicketType() {
    typeExhibition.innerHTML = typeText
  }

  function addPrice() {
    basicPrice.innerHTML = price
    seniorPrice.innerHTML = price / 2
    basicPriceOverview.innerHTML = price
    seniorPriceOverview.innerHTML = price / 2
  }

  function addAmount() {
    let sumBasic = price * basicValue.value
    let sumSenior = (price / 2) * seniorValue.value

    amounts[0].innerHTML = sumBasic
    amounts[1].innerHTML = sumSenior
    totalAmount.innerHTML = sumBasic + sumSenior

    ticketsOverview[0].innerHTML = basicValue.value
    ticketsOverview[1].innerHTML = seniorValue.value
  }

  function addDate() {
    const date = new Date(dateInput.value)
    let options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }

    dateText.innerHTML = date.toLocaleDateString('en-US', options)
  }

  buttonBuy.addEventListener('click', () => {
    checkLocalValue()
    addPrice()
    addAmount()
    setTicketType()
    addTicketType()
  })

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      addAmount()
    })
  })

  dateInput.addEventListener('input', () => {
    addDate()
  })

  // typeTicketCheck.forEach((type) => {
  //   type.removeAttribute('selected')
  //   type.addEventListener('input', () => {
  //     type.setAttribute('selected', 'selected')
  //     typeTicket = type.value
  //     setPrice(typeTicket)
  //   })
  // })
}

//validation

export function validationForm() {
  const date = document.querySelector('.input-form.date')
  const time = document.querySelector('.input-form.time')
  const name = document.querySelector('.input-form.text')
  const email = document.querySelector('.input-form.email')
  const phone = document.querySelector('.input-form.tel')

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()

  date.setAttribute('min', `${year}-${month}-${day}`)

  function validName() {
    const nameLength =
      name.value.length >= 3 && name.value.length <= 15 ? true : false
    const notLetters =
      name.value.replace(/[a-zA-Zа-яА-ЯёЁ\s]+/g, '').length === 0 ? true : false
    console.log(notLetters)

    if (nameLength && notLetters) {
      name.classList.remove('invalid')
    } else {
      console.log('Need only letters')
      name.classList.add('invalid')
    }
  }

  function validEmail() {
    const mail = /^[a-zA-Z-.]+@[a-z]+\.[a-z]{2,3}$/.test(email.value)

    if (mail || email.value == 0) {
      email.classList.remove('invalid')
    } else {
      console.log('Need correct email')
      email.classList.add('invalid')
    }
  }

  function validPhone() {
    const number = /[0-9]{2,3}-[0-9]{2,3}-[0-9]{2,3}-[0-9]{2,3}/.test(
      phone.value
    )

    if (!number || phone.value.match(/[0-9]/g).length > 10) {
      console.log('Need correct phone number')
      phone.classList.add('invalid')
    } else {
      phone.classList.remove('invalid')
    }
  }

  name.addEventListener('input', () => {
    validName()
  })
  email.addEventListener('input', () => {
    validEmail()
  })

  phone.addEventListener('input', () => {
    validPhone()
  })
}
