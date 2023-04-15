const calculateBtn = document.getElementById('calculate-btn');
const resultInput = document.getElementById('result');

calculateBtn.addEventListener('click', () => {
  const numberInput = document.getElementById('number');
  const number = parseFloat(numberInput.value);
  if (isNaN(number)) {
    alert('Please enter a valid number.');
    return;
  }
  const result = Math.sqrt(number);
  resultInput.value = result;
  resultInput.parentElement.classList.add('show');
});
