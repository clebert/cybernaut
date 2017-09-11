/// <reference path="../types/puppeteer.d.ts" />

import {TestSetup, TestTeardown} from '@cybernaut/test/lib/TestRunner';
import {Browser, Page, launch} from 'puppeteer';

export interface TestContext {
  readonly browser: Browser;
  readonly page: Page;
}

export function createTestSetup(
  browser?: Browser | Promise<Browser>
): TestSetup<TestContext> {
  return async () => {
    browser = (await browser) || (await launch());

    const page = await browser.newPage();

    return {browser, page};
  };
}

export function createTestTeardown(): TestTeardown<TestContext> {
  return async testContext => {
    testContext.browser.close();
  };
}
