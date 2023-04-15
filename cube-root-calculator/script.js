const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const number = Number(document.querySelector('#number').value);
  const cubeRoot = Math.cbrt(number);
  result.textContent = `${cubeRoot}`;
});
