/* tslint:disable no-any */

import {createTestRunner} from '../TestRunner';

/* This function works in conjunction with Jest fake timers. */
async function nap(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

describe('TestRunner()', () => {
  let testContext: number;
  let testError: Error;
  let testSequence: string[];
  let testSetup: jest.Mock<any>;
  let testTeardown: jest.Mock<any>;

  beforeEach(() => {
    testContext = Math.random();
    testError = new Error('test error');
    testSequence = [];

    testSetup = jest.fn().mockImplementation(async () => {
      await nap();

      testSequence.push('test setup');

      return testContext;
    });

    testTeardown = jest.fn().mockImplementation(async () => {
      await nap();

      testSequence.push('test teardown');
    });
  });

  it('should reliably run the test steps in the correct order', async () => {
    const run = createTestRunner(testSetup, testTeardown, {
      testStepRetryDelay: 0
    });

    const testStep1 = jest
      .fn()
      .mockImplementationOnce(async () => {
        await nap();

        testSequence.push('test step 1: error 1');

        throw testError;
      })
      .mockImplementationOnce(async () => {
        await nap();

        testSequence.push('test step 1: error 2');

        throw testError;
      })
      .mockImplementation(async () => {
        await nap();

        testSequence.push('test step 1: ok');
      });

    const testStep2 = jest.fn().mockImplementation(async () => {
      await nap();

      testSequence.push('test step 2: ok');
    });

    const testCase = jest.fn().mockImplementation(() => [testStep1, testStep2]);
    const test = run(testCase);

    await test();

    expect(testSetup.mock.calls).toEqual([[]]);
    expect(testCase.mock.calls).toEqual([[testContext]]);

    expect(testStep1.mock.calls).toEqual([
      [testContext],
      [testContext],
      [testContext]
    ]);

    expect(testStep2.mock.calls).toEqual([[testContext]]);
    expect(testTeardown.mock.calls).toEqual([[testContext]]);

    expect(testSequence).toEqual([
      'test setup',
      'test step 1: error 1',
      'test step 1: error 2',
      'test step 1: ok',
      'test step 2: ok',
      'test teardown'
    ]);
  });

  it('should run an erroneous test step 5 times', async () => {
    const run = createTestRunner(testSetup, testTeardown, {
      testStepRetryDelay: 0
    });

    const testStep = jest.fn().mockImplementation(async () => {
      await nap();

      throw testError;
    });

    const testCase = jest.fn().mockImplementation(() => [testStep]);
    const test = run(testCase);

    await expect(test()).rejects.toBe(testError);

    expect(testSetup.mock.calls.length).toEqual(1);
    expect(testCase.mock.calls.length).toEqual(1);
    expect(testStep.mock.calls.length).toEqual(5);
    expect(testTeardown.mock.calls.length).toEqual(1);
  });

  it('should not re-run an erroneous test step', async () => {
    const run = createTestRunner(testSetup, testTeardown, {
      testStepMaxRetries: 0,
      testStepRetryDelay: 0
    });

    const testStep = jest.fn().mockImplementation(async () => {
      await nap();

      throw testError;
    });

    const testCase = jest.fn().mockImplementation(() => [testStep]);
    const test = run(testCase);

    await expect(test()).rejects.toBe(testError);

    expect(testSetup.mock.calls.length).toEqual(1);
    expect(testCase.mock.calls.length).toEqual(1);
    expect(testStep.mock.calls.length).toEqual(1);
    expect(testTeardown.mock.calls.length).toEqual(1);
  });

  it('should delay any re-run of an erroneous test step', async () => {
    const run = createTestRunner(async () => undefined, async () => undefined);

    const testStep = jest
      .fn()
      .mockImplementationOnce(async () => {
        throw testError;
      })
      .mockImplementation(async () => undefined);

    try {
      jest.useFakeTimers();

      const testPromise = run(() => [testStep])();

      await nap();

      expect(testStep.mock.calls.length).toBe(1);

      jest.runTimersToTime(999);

      await nap();

      expect(testStep.mock.calls.length).toBe(1);

      jest.runTimersToTime(1);

      await nap();

      expect(testStep.mock.calls.length).toEqual(2);

      await testPromise;
    } finally {
      jest.useRealTimers();
    }
  });
});
