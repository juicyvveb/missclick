function workWithFunds(){
    const input = document.querySelector('#inputAmount');
    const output = document.querySelector('.output');
    input.addEventListener('input', (e) => {
        output.innerText = +e.target.value * 2
    })
}