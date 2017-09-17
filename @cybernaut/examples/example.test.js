/* IMPORTANT:
 * If you edit this file, please copy all the changes you have made
 * to the README of @cybernaut/test.
 */

const {createTestRunner} = require('@cybernaut/test/lib/TestRunner');

/* This function will be called before any of the test steps run. */
async function testSetup() {
  const testContext = {attempts: 0};

  return testContext;
}

/* This function will be called after all the test steps have completed. */
async function testTeardown(testContext) {
  console.log('attempts:', testContext.attempts);
}

const run = createTestRunner(testSetup, testTeardown, {
  testStepMaxRetries: 2,
  testStepRetryDelay: 100 /* ms */
});

const test = run(testContext => [
  async () => {
    testContext.attempts += 1;

    if (testContext.attempts < 3) {
      console.log('test step 1: error');

      throw new Error();
    }

    console.log('test step 1: ok');
  },
  async () => {
    console.log('test step 2: ok');
  }
]);

/* Vanilla */

const throwOnMainThread = error =>
  setTimeout(() => {
    throw error; /* https://stackoverflow.com/a/30741722 */
  });

test().catch(throwOnMainThread);

/* Jest / Mocha */

it('should run reliably', test);
