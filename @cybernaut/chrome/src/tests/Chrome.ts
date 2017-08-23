import {Engine} from '@cybernaut/engine/lib/Engine';
import {Chrome} from '../Chrome';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine({retries: 1, retryDelay: 500});

describe('Chrome', () => {
  let chrome: Chrome;

  beforeEach(async () => {
    chrome = await Chrome.launchHeadless();
  });

  it('should be able to control Chromeless as expected', async () => {
    try {
      await perform(chrome.loadPage('http://example.com/'));
      await assert(chrome.pageTitle.is.equalTo('Example Domain'));
      await assert(chrome.pageUrl.is.equalTo('http://example.com/'));

      console.log(await perform(chrome.captureScreenshot()));
    } finally {
      await chrome.quit();
    }
  });
});
