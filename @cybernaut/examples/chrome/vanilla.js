/* IMPORTANT: If you edit this file,
 * please copy all the changes you have made to the README of @cybernaut/chrome.
 */

const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {Device} = require('@cybernaut/chrome/lib/Device');
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform} = new Engine();

(async () => {
  const chrome = await Chrome.launchHeadless();

  try {
    await perform(chrome.emulateDevice(Device.iPhone5()));
    await perform(chrome.navigate('https://www.example.com/'));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    const writeToFile = process.env.CI !== 'true';

    console.info(await perform(chrome.captureScreenshot(writeToFile)));
  } finally {
    await chrome.quit();
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
