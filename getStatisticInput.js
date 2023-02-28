const statisticInputs = document.querySelectorAll('input[data-role=stat-input]')
const progressBar = document.querySelector('.progress-bar');
const label = progressBar.querySelector('.label')
let filledInputsLength = [...statisticInputs].filter(input => input.value).length

const fillPercent = Math.round(filledInputsLength * 100 / statisticInputs.length);

setProgress()

function setProgress(){
    progressBar.style.width = `${fillPercent}%`;
    let i = 0;

    let interval = setInterval(() => {
        i+=3;
        if(i > fillPercent){
            clearInterval(interval)
            label.innerHTML = fillPercent
            return
        }
        label.innerHTML = i;
    }, 30)
}
