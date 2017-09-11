/// <reference path="../types/puppeteer.d.ts" />

import {TestSetup, TestTeardown} from '@cybernaut/test/lib/TestRunner';
import {Browser, LaunchOptions, Page, launch} from 'puppeteer';

export interface TestContext {
  readonly browser: Browser;
  readonly page: Page;
}

export function createTestSetup(
  launchOptions?: LaunchOptions
): TestSetup<TestContext> {
  return async () => {
    const browser = await launch(launchOptions);
    const page = await browser.newPage();

    return {browser, page};
  };
}

export function createTestTeardown(): TestTeardown<TestContext> {
  return async testContext => {
    testContext.browser.close();
  };
}
