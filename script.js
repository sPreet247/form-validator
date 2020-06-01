const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// showSuccess
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// checkRequired
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// checkLength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `should be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `should be no more than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// checkPasswordMatch
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// checkValidEmail
function checkValidEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'email is not valid');
  }
}
// checkValidPassword
function checkValidPassword(input) {
  const rep = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9_!#$%&?]{8,20}$/;
  if (rep.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Password is not valid');
  }
}

// eventListener
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 10);
  checkLength(password, 8, 20);
  checkPasswordMatch(password, password2);
  checkValidEmail(email);
  checkValidPassword(password);
});
