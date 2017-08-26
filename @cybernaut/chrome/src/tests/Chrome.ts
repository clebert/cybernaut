import {Engine} from '@cybernaut/engine/lib/Engine';
import {Chrome} from '../Chrome';
import {Device} from '../Device';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine();

describe('Chrome', () => {
  let chrome: Chrome;

  beforeEach(async () => {
    chrome = await Chrome.launchHeadless();
  });

  it('should work as expected', async () => {
    try {
      await perform(chrome.emulateDevice(Device.iPhone5()));
      await perform(chrome.navigateTo('https://spiegel.de/'));

      await assert(chrome.pageTitle.is.containing('SPIEGEL ONLINE'));
      await assert(chrome.pageUrl.is.equalTo('http://m.spiegel.de/'));

      console.info(
        await perform(chrome.captureScreenshot(process.env.CI !== 'true'))
      );
    } finally {
      await chrome.quit();
    }
  });
});
