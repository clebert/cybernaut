import createDebug = require('debug');

import {Builder} from 'selenium-webdriver';
import {Config} from './config';
import {Logger, Test} from './test';

export type Implementation = (t: Test) => Promise<void>;

export type Options =
  Pick<Config, 'capabilities' | 'retries' | 'retryDelay' | 'timeouts'>;

const debug = createDebug('cybernaut:implementation');

export async function run(
  implementation: Implementation, logger: Logger, options: Options
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

    await implementation(new Test(driver, logger, options));
  } finally {
    debug('terminate browser session');

    await driver.quit();
  }
}
