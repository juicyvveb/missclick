let qrUrl;
const qrImg = document.querySelector('.qr-code');

function workWithFunds() {
  const input = document.querySelector('#inputAmount');
  const output = document.querySelector('.output');
  input.addEventListener('input', (e) => {
    output.innerText = +e.target.value * 2
  })

  axios.post('/qr/custom', {
    "data":"https://www.qrcode-monkey.com",
    "config":{
    "body":"circle",
    "logo":"#facebook"
    },
    "size":300,
    "download":false,
    "file":"svg"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    qrUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=https://youtube.com&size=200x200'
}

function confirmCheck() {

  qrImg.setAttribute('src', qrUrl)
  console.log(qrImg)
  console.log(qrUrl)
}