import checkCard from '../js/checkCard';

describe('checkCard', () => {
  test.each([
    ['371449635398431'],
    ['30569309025904'],
    ['6011111111111117'],
    ['3530111333300000'],
    ['5555555555554444'],
    ['4111111111111111'],
    ['2111111111111115'],
  ])(' should return true for number %i', (num) => {
    const res = checkCard(num);

    expect(res).toEqual(true);
  });

  test('should return false', () => {
    const res = checkCard('2111111111111111');

    expect(res).toEqual(false);
  });
});
