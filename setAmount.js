let qrUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=https://youtube.com&size=100x100';
const createFundForm = document.querySelector('#addFunds');

let checkInfo = {
  curr: 0, 
  amount: 0,
  date: 0
}
function workWithFunds(t) {
  const amountField = createFundForm.querySelector('#amountField');
  const currencyName = amountField.querySelector('.currency');
  currencyName.innerText = t.getAttribute('data-curr');

  const input = document.querySelector('#inputAmount');
  const output = document.querySelector('.output');
  input.addEventListener('input', (e) => {
    let val = +e.target.value * 2
    output.innerText = val;
    checkInfo.amount = val
  })

  checkInfo.curr = t.getAttribute('data-curr');
  const date = new Date();
  checkInfo.date = `${date.getDay()}, ${date.getHours()}:${date.getMinutes()}`;
  
}

function confirmCheck() {
  const confirmModal = document.querySelector('#confirmModal')
  const qrImg = confirmModal.querySelector('.qr-code');
  qrImg.setAttribute('src', qrUrl)

  
  const currencyField = confirmModal.querySelector('.curr-name');
  currencyField.innerText = checkInfo.curr

  const amountFiled = confirmModal.querySelector('.amount')
  amountFiled.innerText = checkInfo.amount

  const dateField = confirmModal.querySelector('.date')
  dateField.innerText = checkInfo.date
}