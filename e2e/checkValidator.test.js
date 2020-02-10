import puppeteer from 'puppeteer';

const childProcess = require('child_process');

const server = childProcess.fork(`${__dirname}/test-server.js`);

jest.setTimeout(30000);

describe('Validation form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9999';

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  }); // открыть браузер
  afterAll(async () => { // закрыть браузер
    await browser.close();
    server.kill();
  }); // закрыть браузер

  test('should add .disabled-card class for invalid cards systems', async () => {
    await page.goto(baseUrl);
    const $form = await page.$('#form');
    const $input = await $form.$('#card-number');
    await $input.type('371449635398431');
    const $submit = await $form.$('#validate-btn');
    $submit.click();

    await page.waitFor(1000);
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
