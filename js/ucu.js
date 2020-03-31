// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces between words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  

document.getElementById('email').addEventListener("change", validateMail);
document.getElementById('phone').addEventListener("change", validatePhone);
document.getElementById('message').addEventListener("change", validateMessage);
document.getElementById('name').addEventListener("change", validateName);


function validateMe(event) {
  validateMail(event);
  validateMessage(event);
  validateName(event);
  validatePhone(event);
}

function validateMail(event) {
  event.preventDefault();

  const emailNode = document.getElementById("email");
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
  emailErrorNode.innerHTML = '';


  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");


  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  validate_length(5, 50, emailNode, emailErrors, 'Email');
  validate_format(re, emailNode, emailErrors, 'Email');

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  return false;
}

function validateName(event) {
  event.preventDefault();


  const nameNode = document.getElementById("name");
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';


  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");


  if (!(nameNode.value.split(" ").length === 1 || nameNode.value.split(" ").length === 2+1)) {
    let li = document.createElement('li');
    li.innerText = 'Name should have 0 or 2 whitespaces between words';
    nameErrors.appendChild(li)
  }

  validate_length(1, Infinity, nameNode, nameErrors, 'Name')

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }

  return false;
}

function validatePhone(event) {
  event.preventDefault();


  const phoneNode = document.getElementById("phone");
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block');
  phoneErrorNode.innerHTML = '';


  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  let re = /^[+0]380[(]{0,1}[0-9]{1,2}[)]{0,1}[-\s/0-9]*/

  if (phoneNode.value.replace(/[^0-9]/g,"").length < 12) {
    let li = document.createElement('li');
    li.innerText = 'Phone number should contain not less than 12 digits';
    phoneErrors.appendChild(li)
  }

  validate_format(re, phoneNode, phoneErrorNode, 'Phone')


  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

  return false;
}

function validateMessage(event)   {
  event.preventDefault();


  const messageNode = document.getElementById("message");
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  let re = /\b(ugly|dumm|stupid|pig|ignorant)\b/

  validate_length(10, Infinity, messageNode, messageErrors, 'Message');
  validate_format(re, messageNode, messageErrors, 'Message', true, 'should not contain bad language')

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }

  return false;
}

function validate_length(min, max, node, errors, field_name) {
  if (node.value.length < min ) {
    let li = document.createElement('li');
    li.innerText = field_name + ' is too short';
    errors.appendChild(li)
  }

  if (node.value.length > max) {
    let li = document.createElement('li');
    li.innerText = field_name + ' is too long';
    errors.appendChild(li);
  }
}

function validate_format(re, node, errors, field_name, reverse=false, msg=' should have correct format') {
  if (reverse ^ node.value.match(re)) {
    let li = document.createElement('li');
    li.innerText = field_name + ' ' + msg;
    errors.appendChild(li);
  }
}