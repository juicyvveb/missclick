const confirmPs = document.querySelector('#confirm-password-input')
const modelPs = document.querySelector('#password-input')

modelPs.addEventListener('input', async (e) => {
    setPattern(confirmPs, modelPs);
    await navigator.clipboard.writeText(e.target.value);
}) 

function setPattern(target = confirmPs, model = modelPs) {
  target.setAttribute('pattern', model.value);
}

setPattern(confirmPs, modelPs)