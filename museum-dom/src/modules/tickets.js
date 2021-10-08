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
