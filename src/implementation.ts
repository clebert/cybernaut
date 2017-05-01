import createDebug = require('debug');

import {uploadBase64} from 'imgur';
import {Builder, WebDriver} from 'selenium-webdriver';
import {Config} from './config';
import {Test} from './test';

export type Implementation = (t: Test) => Promise<void>;

export type Options =
  Pick<Config, 'capabilities' | 'retries' | 'retryDelay' | 'timeouts'>;

const debug = createDebug('cybernaut:implementation');

class TapTest extends Test {
  private readonly _tap: Tap.Test;

  public constructor(driver: WebDriver, tap: Tap.Test, options: Options) {
    super(driver, options.retries, options.retryDelay);

    this._tap = tap;
  }

  public fail(message: string): void {
    throw new Error(message);
  }

  public pass(message: string): void {
    this._tap.pass(message);
  }
}

async function takeScreenshot(driver: WebDriver, error: Error): Promise<Error> {
  try {
    const screenshot = await driver.takeScreenshot();

    // TODO: setClientId

    const response = await uploadBase64(screenshot);

    if (response.data && response.data.link) {
      return new Error(error.message + ` (screenshot: ${response.data.link})`);
    } else {
      // TODO: debug
    }
  } catch (e) {
    // TODO: debug
  }

  return error;
}

export async function execute(
  implementation: Implementation, tap: Tap.Test, options: Options
): Promise<void> {
  const {capabilities, timeouts} = options;

  debug('create browser session');

  const driver = await new Builder().withCapabilities(capabilities).build();

  try {
    debug('manage timeout behavior');

    await driver.manage().setTimeouts({
      implicit: timeouts.element,
      pageLoad: timeouts.page,
      script: timeouts.script
    });

    debug('execute test implementation');

    await implementation(new TapTest(driver, tap, options));
  } catch (e) {
    throw await takeScreenshot(driver, e); // TODO: await muss getestet werden
  } finally {
    debug('terminate browser session');

    await driver.quit();
  }
}
