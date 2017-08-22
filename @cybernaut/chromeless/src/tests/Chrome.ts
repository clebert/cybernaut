import {Engine} from '@cybernaut/engine/lib/Engine';
import {Chrome} from '../Chrome';

process.on('unhandledRejection', () => undefined);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const engine = new Engine({retries: 1, retryDelay: 500});

describe('Chrome', () => {
  let chrome: Chrome;

  beforeEach(() => {
    chrome = new Chrome({noScreenshot: true});
  });

  it('should be able to control Chromeless as expected', async () => {
    try {
      await engine.perform(chrome.loadPage('http://example.com/'));
      await engine.assert(chrome.pageTitle.is.equalTo('Example Domain'));
      await engine.assert(chrome.pageUrl.is.equalTo('http://example.com/'));
    } finally {
      await chrome.quit();
    }
  });
});
