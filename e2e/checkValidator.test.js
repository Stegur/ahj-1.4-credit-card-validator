import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('Validation form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppeteer.launch(
      // {
      //   headless: false,
      //   slowMo: 100,
      //   devtools: true,
      // },
    );
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should add .disabled-card class for invalid cards systems', async () => {
    await page.goto(baseUrl);
    const $form = await page.$('#form');
    const $input = await $form.$('#card-number');
    await $input.type('371449635398431');
    const $submit = await $form.$('#validate-btn');
    $submit.click();

    const totalCardsCount = await page.$$eval('.card', (nodes) => nodes.length);
    const disabledCardsCount = await page.$$eval('.disabled-card', (nodes) => nodes.length);

    expect(disabledCardsCount).toBe(totalCardsCount - 1);
  });

  test('should add tooltip if card number in wrong', async () => {
    await page.goto(baseUrl);
    const $form = await page.$('#form');
    const $input = await $form.$('#card-number');
    await $input.type('41111111111111111');
    const $submit = await $form.$('#validate-btn');
    $submit.click();
    await page.waitFor(1000);
    const errorText = await $form.$eval('.error', (node) => node.innerText);
    expect(errorText).toBe('Wrong card number! Please, check it!');
  });
});
