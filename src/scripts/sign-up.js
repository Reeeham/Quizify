


var form = document.forms['sign-up'];
var email = document.querySelector('#email');
var quizId = document.querySelector('#quizId');
var phoneNo = document.querySelector('#phone');
var gender = document.getElementsByName("gender");

form.addEventListener('submit', validateSignupForm);

function validateSignupForm(ev) {
    ev.preventDefault();
    console.log(gender,'gender');
  let isGenderChecked = Array.from(gender).some(x=>x.checked == true);
    if(isGenderChecked === false) { 
        console.log('not checked');
        var requiredSpan = document.createElement('span');
        requiredSpan.textContent = "Gender is required";
        requiredSpan.style.color = 'red';
        form.appendChild(requiredSpan);
    }
    console.log(ev);
}