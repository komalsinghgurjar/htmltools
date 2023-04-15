const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const messageEl = document.getElementById('message');

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-={}[]|:;"<>,.?/';

function generatePassword() {
  const length = lengthEl.value;
  let password = '';

  const allChars = (uppercaseEl.checked ? uppercaseLetters : '') +
                   (lowercaseEl.checked ? lowercaseLetters : '') +
                   (numbersEl.checked ? numbers : '') +
                   (symbolsEl.checked ? symbols : '');

  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  passwordEl.value = password;
  messageEl.innerText = '';
}

function copyPassword() {
  if (passwordEl.value === '') {
    messageEl.innerText = 'Nothing to copy';
    return;
  }

  passwordEl.select();
  document.execCommand('copy');
  messageEl.innerText = 'Password copied to clipboard';
}

generateEl.addEventListener('click', generatePassword);
copyEl.addEventListener('click', copyPassword);
