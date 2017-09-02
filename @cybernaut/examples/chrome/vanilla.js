/* IMPORTANT: If you edit this file,
 * please copy all the changes you have made to the README of @cybernaut/chrome.
 */

const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {iPhone5} = require('@cybernaut/chrome/lib/MobileDevice');
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform} = new Engine();

(async () => {
  const chrome = await Chrome.launch(true);

  try {
    await perform(chrome.navigateTo('https://www.example.com/'));
    await perform(chrome.emulateMobileDevice(iPhone5()));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    console.info(await perform(chrome.captureScreenshot()));
  } finally {
    await chrome.quit();
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
