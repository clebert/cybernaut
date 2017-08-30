/* IMPORTANT: If you edit this file,
 * please copy all the changes you have made to the README of @cybernaut/chrome.
 */

const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {iPhone5} = require('@cybernaut/chrome/lib/MobileDevice');
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform} = new Engine();

(async () => {
  const chrome = await Chrome.launchHeadless();

  try {
    await perform(chrome.emulateMobileDevice(iPhone5()));
    await perform(chrome.navigateTo('https://www.example.com/'));

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
