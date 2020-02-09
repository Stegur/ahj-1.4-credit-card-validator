export default function getCardSystem(digits) {
  let name = '';
  const firstNumbers = digits.substr(0, 2);

  if (firstNumbers[0] === '2') {
    name = 'Mir';
  } else if (firstNumbers === '30' || firstNumbers === '36' || firstNumbers === '38') {
    name = 'Diners';
  } else if (firstNumbers === '31' || firstNumbers === '35') {
    name = 'JCB';
  } else if (firstNumbers === '34' || firstNumbers === '37') {
    name = 'American Express';
  } else if (firstNumbers[0] === '4') {
    name = 'Visa';
  } else if (firstNumbers[0] === '5') {
    name = 'Mastercard';
  } else if (firstNumbers === '60') {
    name = 'Discover';
  } else {
    return false;
  }

  return name;
}
