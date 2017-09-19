/* tslint:disable no-any */

import isPNG = require('is-png');

import {createTestRunner} from '@cybernaut/test/lib/TestRunner';
import {readFile} from 'fs-extra';
import {createTestSetup, createTestTeardown} from '../TestContext';
import {takeScreenshot} from '../takeScreenshot';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000; /* 30 seconds */

const run = createTestRunner(createTestSetup(), createTestTeardown(), {
  testStepMaxRetries: 0
});

describe('takeScreenshot()', () => {
  it(
    'should return a Base64-encoded PNG',
    run(({page}) => [
      async () => {
        const CI = process.env.CI;

        process.env.CI = 'true';

        try {
          const png = await takeScreenshot(page);
          const data = new Buffer(png, 'base64');

          expect(isPNG(data)).toBe(true);
        } finally {
          process.env.CI = CI;
        }
      }
    ])
  );

  it(
    'should write a PNG file and return its filename',
    run(({page}) => [
      async () => {
        const CI = process.env.CI;

        process.env.CI = undefined;

        try {
          const filename = await takeScreenshot(page);

          expect(filename).toMatch(
            /* https://stackoverflow.com/a/13653180 */
            /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/screenshot.png$/i
          );

          const data = await readFile(filename);

          expect(isPNG(data)).toBe(true);
        } finally {
          process.env.CI = CI;
        }
      }
    ])
  );
});
