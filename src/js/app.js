import checkCard from './checkCard';
import getCardSystem from './getCardSystem';

// Elements
const $cards = document.querySelectorAll('.card');
const $form = document.getElementById('form');
const $input = document.getElementById('card-number');
const $error = document.getElementById('number-error');

// Events
$form.addEventListener('submit', (event) => {
  event.preventDefault();

  const number = $input.value;
  const isCorrectNumber = checkCard(number);
  const cardSystem = getCardSystem(number);

  $error.textContent = '';

  $cards.forEach((card) => {
    card.classList.remove('disabled-card');

    if (!isCorrectNumber) {
      $error.textContent = 'Wrong card number! Please, check it!';
      return;
    }

    if (card.title !== cardSystem) {
      card.classList.add('disabled-card');
    }
  });
});
