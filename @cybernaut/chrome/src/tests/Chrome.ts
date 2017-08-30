import isPNG = require('is-png');

import {Engine} from '@cybernaut/engine/lib/Engine';
import * as express from 'express';
import {readFile} from 'fs-extra';
import {Server} from 'http';
import {join} from 'path';
import {getPortPromise} from 'portfinder';
import {Chrome} from '../Chrome';
import {MobileDevice} from '../MobileDevice';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform, retryDelay} = new Engine({retries: 1, retryDelay: 100});

const app = express();

app.use(express.static(join(__dirname, 'fixtures')));

app.get('/waitUntilLoaded.js', (req, res) => {
  setTimeout(() => {
    res.setHeader('content-type', 'text/javascript');
    res.end("document.title = 'an async title'");
  }, retryDelay * 2);
});

let chrome: Chrome;
let port: number;
let server: Server;

function createUrl(name: string): string {
  return `http://localhost:${port}/${name}.html`;
}

beforeEach(async () => {
  chrome = await Chrome.launchHeadless();
  port = await getPortPromise();
  server = app.listen(port);
});

afterEach(async () => {
  try {
    await chrome.quit();
  } finally {
    server.close();
  }
});

describe('Chrome.scriptResult()', () => {
  it('should describe itself correctly', () => {
    const condition = chrome
      .scriptResult((a: string, b: string) => a + b, 'a', 'b')
      .is.equalTo('ab');

    expect(condition.description).toBe(
      "chrome.scriptResult((a, b) => a + b, 'a', 'b').is.equalTo('ab')"
    );
  });

  it('should run the specified script in the browser context', async () => {
    await perform(chrome.navigateTo(createUrl('scriptResult')));

    await assert(
      chrome.scriptResult(() => document.title).is.equalTo('scriptResult')
    );
  });

  it('should pass the specified arguments to the specified script', async () => {
    await assert(
      chrome
        .scriptResult((a: string, b: string) => a + b, 'a', 'b')
        .is.equalTo('ab')
    );
  });

  it('should throw a script error', async () => {
    const condition = chrome
      .scriptResult(() => {
        throw new Error('an error');
      })
      .is.equalTo(undefined);

    await expect(assert(condition)).rejects.toEqual(
      new Error(
        [
          'Assert: chrome.scriptResult(() => {',
          "            throw new Error('an error');",
          '        }).is.equalTo(undefined) => Error: an error'
        ].join('\n')
      )
    );
  });

  it('should throw an unknown script error', async () => {
    const condition = chrome
      .scriptResult(() => {
        throw new Error();
      })
      .is.equalTo(undefined);

    await expect(assert(condition)).rejects.toEqual(
      new Error(
        [
          'Assert: chrome.scriptResult(() => {',
          '            throw new Error();',
          '        }).is.equalTo(undefined) => Error: Unknown error'
        ].join('\n')
      )
    );
  });
});

describe('Chrome.runScript()', () => {
  it('should describe itself correctly', () => {
    const action = chrome.runScript((a: string, b: string) => a + b, 'a', 'b');

    expect(action.description).toBe(
      "chrome.runScript((a, b) => a + b, 'a', 'b')"
    );
  });

  it('should run the specified script in the browser context', async () => {
    await perform(chrome.navigateTo(createUrl('runScript'), true));

    const result = await perform(chrome.runScript(() => document.title));

    expect(result).toBe('runScript');
  });

  it('should pass the specified arguments to the specified script', async () => {
    const result = await perform(
      chrome.runScript((a: string, b: string) => a + b, 'a', 'b')
    );

    expect(result).toBe('ab');
  });

  it('should throw a script error', async () => {
    const action = chrome.runScript(() => {
      throw new Error('an error');
    });

    await expect(perform(action)).rejects.toEqual(
      new Error(
        [
          'Perform: chrome.runScript(() => {',
          "            throw new Error('an error');",
          '        }) => Error: an error'
        ].join('\n')
      )
    );
  });

  it('should throw an unknown script error', async () => {
    const action = chrome.runScript(() => {
      throw new Error();
    });

    await expect(perform(action)).rejects.toEqual(
      new Error(
        [
          'Perform: chrome.runScript(() => {',
          '            throw new Error();',
          '        }) => Error: Unknown error'
        ].join('\n')
      )
    );
  });
});

describe('Chrome.navigateTo()', () => {
  it('should describe itself correctly', () => {
    const action = chrome.navigateTo(createUrl('navigateTo'), true);

    expect(action.description).toBe(
      `chrome.navigateTo('${createUrl('navigateTo')}', true)`
    );
  });

  it('should wait until loaded', async () => {
    await perform(chrome.navigateTo(createUrl('navigateTo'), true));

    await assert(
      chrome.scriptResult(() => document.title).is.equalTo('an async title')
    );
  });
});

describe('Chrome.pageTitle', () => {
  it('should describe itself correctly', () => {
    const condition = chrome.pageTitle.is.equalTo('pageTitle');

    expect(condition.description).toBe(
      "chrome.pageTitle.is.equalTo('pageTitle')"
    );
  });

  it('should return the page title', async () => {
    await perform(chrome.navigateTo(createUrl('pageTitle')));

    await assert(chrome.pageTitle.is.equalTo('pageTitle'));
  });
});

describe('Chrome.pageUrl', () => {
  it('should describe itself correctly', () => {
    const condition = chrome.pageUrl.is.equalTo('pageUrl');

    expect(condition.description).toBe("chrome.pageUrl.is.equalTo('pageUrl')");
  });

  it('should return the page url', async () => {
    await perform(chrome.navigateTo(createUrl('pageUrl')));

    await assert(chrome.pageUrl.is.equalTo(createUrl('pageUrl')));
  });
});

describe('Chrome.captureScreenshot()', () => {
  it('should describe itself correctly', () => {
    const action = chrome.captureScreenshot(true);

    expect(action.description).toBe('chrome.captureScreenshot(true)');
  });

  it('should write a PNG file and return its filename', async () => {
    await perform(chrome.navigateTo(createUrl('captureScreenshot')));

    const filename = await perform(chrome.captureScreenshot(true));

    expect(filename).toMatch(
      /* https://stackoverflow.com/a/13653180 */
      /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/screenshot.png$/i
    );

    const data = await readFile(filename);

    expect(isPNG(data)).toBe(true);
  });

  it('should return a Base64-encoded PNG', async () => {
    await perform(chrome.navigateTo(createUrl('captureScreenshot')));

    const data = new Buffer(
      await perform(chrome.captureScreenshot()),
      'base64'
    );

    expect(isPNG(data)).toBe(true);
  });
});

describe('Chrome.emulateMobileDevice()', () => {
  let device: MobileDevice;

  beforeEach(() => {
    device = {
      width: 1920,
      height: 1080,
      pixelRatio: 3,
      userAgent: 'an user agent'
    };
  });

  it('should describe itself correctly', () => {
    const action = chrome.emulateMobileDevice(device, true);

    expect(action.description).toBe(
      "chrome.emulateMobileDevice({width: 1920, height: 1080, pixelRatio: 3, userAgent: 'an user agent'}, true)"
    );
  });

  it('should set the screen width', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device));

    await assert(
      chrome.scriptResult(() => window.screen.width).is.equalTo(device.width)
    );
  });

  it('should set the screen height', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device));

    await assert(
      chrome.scriptResult(() => window.screen.height).is.equalTo(device.height)
    );
  });

  it('should set the device pixel ratio', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device));

    await assert(
      chrome
        .scriptResult(() => window.devicePixelRatio)
        .is.equalTo(device.pixelRatio)
    );
  });

  it('should set the user agent', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device));

    await assert(
      chrome
        .scriptResult(() => navigator.userAgent)
        .is.equalTo(device.userAgent)
    );
  });

  it('should enable touch events', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device));

    await assert(
      chrome.scriptResult(() => 'ontouchstart' in window).is.equalTo(true)
    );
  });

  it('should scale the view to fit the available browser window area', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice')));
    await perform(chrome.emulateMobileDevice(device, true));

    const writeToFile = process.env.CI !== 'true';

    /* This test case can only be checked by visual inspection. */
    console.info(
      'emulateMobileDevice:fitWindow:',
      await perform(chrome.captureScreenshot(writeToFile))
    );
  });
});
