/* IMPORTANT:
 * If you edit this file, please copy all the changes you have made
 * to the README of @cybernaut/puppeteer.
 */

const {
  createTestSetup,
  createTestTeardown
} = require('@cybernaut/puppeteer/lib/TestContext');

const {createTestRunner} = require('@cybernaut/test/lib/TestRunner');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const puppeteerTest = createTestRunner(createTestSetup(), createTestTeardown());

test(
  'Navigating to https://example.com and asserting the page title',
  puppeteerTest(({page}) => [
    async () => {
      const response = await page.goto('https://example.com');

      expect(response.ok).toBe(true);
    },
    async () => {
      expect(await page.title()).toBe('Example Domain');
    }
  ])
);
