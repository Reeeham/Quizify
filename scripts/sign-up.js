var form = document.forms['sign-up'];
var emailEl = document.querySelector('#email');
var nameEl = document.querySelector('#name');
var DOBEl = document.querySelector('#date');
var genderEl = document.getElementsByName('gender');
var quizId = document.querySelector('#quizId');
var phoneNoEl = document.querySelector('#phone');
var countryEl = form.country;
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
function atLeastOneRadio(radioElement) {
   for(let r of radioElement){
       if(r.checked) { 
           return true;
       }
   }
   return false;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isValidPhoneNumber(inputTxt) {
    var phoneNoPattern = /^\d{11}$/;
    return (inputTxt.match(phoneNoPattern));
}
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}
const checkName = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}
const checkDOB = () => {
    let valid = false;
    const dob = DOBEl.value;
    if (!isRequired(dob)) {
        showError(DOBEl, 'Date of birth cannot be blank.');
    } else if (isValidDate(dob)) {
        showError(DOBEl, 'Date of birth is not valid.')
    } else {
        showSuccess(DOBEl);
        valid = true;
    }
    return valid;
}
const checkGender = () => {
    let valid = false;
    if (!atLeastOneRadio(genderEl)) {
        showError(genderEl[0], 'gender cannot be blank.');
    } else {
        showSuccess(genderEl[0]);
        valid = true;
    }
    return valid;
}
const checkPhoneNumber = () => {
    let valid = false;
    const phoneNo = phoneNoEl.value;
    if(!isValidPhoneNumber(phoneNo)) {
        showError(phoneNoEl, 'must be a valid phone number');
    } else { 
        showSuccess(phoneNoEl);
        valid = true;
    }
    return valid;
}
const checkCountry = () => {
    let valid = false;
    if(!(countryEl.value === '')) {
        valid = true;
        showSuccess(countryEl)
    }else { 
        showError(countryEl, 'you must choose country.')
    }
    return valid;
}
const getFormValues = () => {
    let form = document.querySelector('form')
    return Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})
}
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'date':
            checkDOB();
            break;
        case 'male':
            checkGender();
            break;
        case 'female':
            checkGender();
            break;
        case 'phone': 
            checkPhoneNumber();
            break;
    }
}));
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(checkGender() && checkCountry()) { 
       let user = getFormValues();
       
       console.log('ssss',user)
       localStorage.user =  JSON.stringify(user);
       window.location.href = '/quiz.html';
    }
})