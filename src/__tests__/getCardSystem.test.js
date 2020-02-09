import getCardSystem from '../js/getCardSystem';

describe('checkCard', () => {
  test.each([
    ['371449635398431', 'American Express'],
    ['30569309025904', 'Diners'],
    ['6011111111111117', 'Discover'],
    ['3530111333300000', 'JCB'],
    ['5555555555554444', 'Mastercard'],
    ['4111111111111111', 'Visa'],
    ['2111111111111115', 'Mir'],
  ])(' should return true for number %i', (num, cardSystem) => {
    const res = getCardSystem(num);

    expect(res).toEqual(cardSystem);
  });
  test('should return false', () => {
    const res = getCardSystem('1111111111111115');

    expect(res).toEqual(false);
  });
});
