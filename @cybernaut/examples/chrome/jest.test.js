/* IMPORTANT: If you edit this file,
 * please copy all the changes you have made to the README of @cybernaut/chrome.
 */

const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {Device} = require('@cybernaut/chrome/lib/Device');
const {Engine} = require('@cybernaut/engine/lib/Engine');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine();

let chrome;

beforeEach(async () => {
  chrome = await Chrome.launchHeadless();
});

test('example', async () => {
  try {
    await perform(chrome.emulateDevice(Device.iPhone5()));
    await perform(chrome.navigateTo('https://www.example.com/'));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    const writeToFile = process.env.CI !== 'true';

    console.info(await perform(chrome.captureScreenshot(writeToFile)));
  } finally {
    await chrome.quit();
  }
});
