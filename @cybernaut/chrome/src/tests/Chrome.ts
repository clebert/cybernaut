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

const {assert, perform, retryDelay} = new Engine(1, 100);

const app = express();

app.use(express.static(join(__dirname, 'fixtures')));

app.get('/Chrome/waitUntilLoaded.js', (req, res) => {
  setTimeout(() => {
    res.setHeader('content-type', 'text/javascript');
    res.end("document.title = 'asyncTitle'");
  }, retryDelay * 2);
});

let chrome: Chrome;
let port: number;
let server: Server;

function createUrl(name: string): string {
  return `http://localhost:${port}/Chrome/${name}.html`;
}

beforeEach(async () => {
  /* The GUI mode can only be tested manually. */
  chrome = await Chrome.launch(true);
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
      `Chrome.launch(${chrome.headless}).scriptResult((a, b) => a + b, 'a', 'b').is.equalTo('ab')`
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
        throw new Error('error');
      })
      .is.equalTo(undefined);

    await expect(assert(condition)).rejects.toEqual(
      new Error(
        [
          `Assert: Chrome.launch(${chrome.headless}).scriptResult(() => {`,
          "            throw new Error('error');",
          '        }).is.equalTo(undefined) => Error: error'
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
          `Assert: Chrome.launch(${chrome.headless}).scriptResult(() => {`,
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
      `Chrome.launch(${chrome.headless}).runScript((a, b) => a + b, 'a', 'b')`
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
      throw new Error('error');
    });

    await expect(perform(action)).rejects.toEqual(
      new Error(
        [
          `Perform: Chrome.launch(${chrome.headless}).runScript(() => {`,
          "            throw new Error('error');",
          '        }) => Error: error'
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
          `Perform: Chrome.launch(${chrome.headless}).runScript(() => {`,
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
      `Chrome.launch(${chrome.headless}).navigateTo('${createUrl(
        'navigateTo'
      )}', true)`
    );
  });

  it('should wait until loaded', async () => {
    await perform(chrome.navigateTo(createUrl('navigateTo'), true));

    await assert(
      chrome.scriptResult(() => document.title).is.equalTo('asyncTitle')
    );
  });
});

describe('Chrome.pageTitle', () => {
  it('should describe itself correctly', () => {
    const condition = chrome.pageTitle.is.equalTo('pageTitle');

    expect(condition.description).toBe(
      `Chrome.launch(${chrome.headless}).pageTitle.is.equalTo('pageTitle')`
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

    expect(condition.description).toBe(
      `Chrome.launch(${chrome.headless}).pageUrl.is.equalTo('pageUrl')`
    );
  });

  it('should return the page url', async () => {
    await perform(chrome.navigateTo(createUrl('pageUrl')));

    await assert(chrome.pageUrl.is.equalTo(createUrl('pageUrl')));
  });
});

describe('Chrome.captureScreenshot()', () => {
  it('should describe itself correctly', () => {
    const action = chrome.captureScreenshot(true);

    expect(action.description).toBe(
      `Chrome.launch(${chrome.headless}).captureScreenshot(true)`
    );
  });

  function testScreenshot(writeToFile?: false): void {
    it('should return a Base64-encoded PNG', async () => {
      await perform(chrome.navigateTo(createUrl('captureScreenshot')));

      const data = new Buffer(
        await perform(chrome.captureScreenshot(writeToFile)),
        'base64'
      );

      expect(isPNG(data)).toBe(true);
    });
  }

  function testScreenshotFile(writeToFile?: true): void {
    it('should write a PNG file and return its filename', async () => {
      await perform(chrome.navigateTo(createUrl('captureScreenshot')));

      const filename = await perform(chrome.captureScreenshot(writeToFile));

      expect(filename).toMatch(
        /* https://stackoverflow.com/a/13653180 */
        /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/screenshot.png$/i
      );

      const data = await readFile(filename);

      expect(isPNG(data)).toBe(true);
    });
  }

  describe('on CI', () => {
    let CI: string | undefined;

    beforeAll(() => {
      CI = process.env.CI;

      process.env.CI = 'true';
    });

    afterAll(() => {
      process.env.CI = CI;
    });

    testScreenshot();
  });

  describe('locally', () => {
    let CI: string | undefined;

    beforeAll(() => {
      CI = process.env.CI;

      process.env.CI = undefined;
    });

    afterAll(() => {
      process.env.CI = CI;
    });

    testScreenshotFile();
  });

  testScreenshot(false);
  testScreenshotFile(true);
});

describe('Chrome.emulateMobileDevice()', () => {
  let device: MobileDevice;

  beforeEach(() => {
    device = {
      width: 1920,
      height: 1080,
      pixelRatio: 3,
      userAgent: 'userAgent'
    };
  });

  it('should describe itself correctly', () => {
    const action = chrome.emulateMobileDevice(device, true);

    expect(action.description).toBe(
      `Chrome.launch(${chrome.headless}).emulateMobileDevice({width: 1920, height: 1080, pixelRatio: 3, userAgent: 'userAgent'}, true)`
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
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice'), true));
    await perform(chrome.emulateMobileDevice(device));

    /* This test case can only be checked by visual inspection. */
    console.info(
      'emulateMobileDevice:fitWindow:true:',
      await perform(chrome.captureScreenshot())
    );
  });

  it('should not scale the view to fit the available browser window area', async () => {
    await perform(chrome.navigateTo(createUrl('emulateMobileDevice'), true));
    await perform(chrome.emulateMobileDevice(device, false));

    /* This test case can only be checked by visual inspection. */
    console.info(
      'emulateMobileDevice:fitWindow:false:',
      await perform(chrome.captureScreenshot())
    );
  });
});
