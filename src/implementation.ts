import createDebug = require('debug');

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

  public fail(message: string, cause: Error): void {
    throw new Error(`${message} (cause: ${cause.message})`);
  }

  public pass(message: string): void {
    this._tap.pass(message);
  }
}

export async function execute(
  implementation: Implementation, tap: Tap.Test, options: Options
): Promise<void> {
  const {capabilities, timeouts} = options;

  debug('create a new WebDriver instance');

  const driver = await new Builder().withCapabilities(capabilities).build();

  try {
    debug('manage timeout behavior for the newly created WebDriver instance');

    await driver.manage().setTimeouts({
      implicit: timeouts.element,
      pageLoad: timeouts.page,
      script: timeouts.script
    });

    debug('execute test implementation');

    await implementation(new TapTest(driver, tap, options));
  } finally {
    await driver.quit();
  }
}
