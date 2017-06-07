import createDebug = require('debug');

import {Builder} from 'selenium-webdriver';
import {Logger, TestContext} from '../core/test-context';
import {SeleniumConfig} from './config';
import {SeleniumTestContext} from './test-context';

export type SeleniumTest = (
  t: SeleniumTestContext,
  config: SeleniumConfig
) => Promise<void>;

const debug = createDebug('cybernaut:test');

export async function run(
  implementation: SeleniumTest,
  logger: Logger,
  config: SeleniumConfig
): Promise<void> {
  const {capabilities, timeouts} = config;

  debug('Create the browser session');

  const driver = await new Builder().withCapabilities(capabilities).build();

  try {
    debug('Manage the timeout behavior');

    await driver.manage().setTimeouts({
      implicit: timeouts.element,
      pageLoad: timeouts.page,
      script: timeouts.script
    });

    debug('Run the test implementation');

    await implementation(new TestContext(driver, logger, config), config);
  } finally {
    debug('Terminate the browser session');

    await driver.quit();
  }
}
