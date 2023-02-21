!(function () {
    "use strict";
    window.addEventListener(
        "load",
        
        function () {
            var t = document.getElementsByClassName("needs-validation");
            t &&
                Array.prototype.filter.call(t, function (e) {
                    // const secondPs = document.querySelector('#confirm-password-input');
                    // const firstPs = document.querySelector('#password-input');
                    e.addEventListener(
                        "submit",
                        function (t) {
                            !1 === e.checkValidity() && (t.preventDefault(), t.stopPropagation()), e.classList.add("was-validated");
                            comparePasswords()
                        },
                        !1
                    );
                });
        },
        !1
    );
})();

function comparePasswords(){
    const firstPs = document.querySelector('#password-input');
    const secondPs = document.querySelector('#confirm-password-input');
    secondPs.pattern = firstPs.value
    console.log(secondPs.pattern)
    if(firstPs.value != secondPs.value){
        const attentionText = document.querySelector('#custom-attention');
        attentionText.classList.add('invalid-feedback--active');
        
        secondPs.addEventListener('input', (e) => {
            if(e.target.value != firstPs.value){
                comparePasswords()
            }
            else{
                attentionText.classList.remove('invalid-feedback--active');
            }
        })
    }
}
