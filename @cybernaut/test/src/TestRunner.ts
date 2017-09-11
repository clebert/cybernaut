import {execute} from './execute';
import {getValue} from './getValue';

export type TestSetup<T> = () => Promise<T>;
export type TestTeardown<T> = (testContext: T) => Promise<void>;

export interface TestOptions {
  readonly testStepMaxRetries?: number;
  readonly testStepRetryDelay?: number;
}

/* tslint:disable-next-line no-any */
export type TestStep<T> = (testContext: T) => Promise<any>;
export type TestCase<T> = (testContext: T) => TestStep<T>[];
export type Test = () => Promise<void>;
export type TestRunner<T> = (testCase: TestCase<T>) => Test;

export function createTestRunner<T>(
  testSetup: TestSetup<T>,
  testTeardown: TestTeardown<T>,
  testOptions?: TestOptions
): TestRunner<T> {
  const testStepMaxRetries = getValue(
    testOptions && testOptions.testStepMaxRetries,
    4
  );

  const testStepRetryDelay = getValue(
    testOptions && testOptions.testStepRetryDelay,
    1000
  );

  return (testCase: TestCase<T>) => async () => {
    const testContext = await testSetup();

    try {
      for (const testStep of testCase(testContext)) {
        await execute(
          async () => testStep(testContext),
          testStepMaxRetries,
          testStepRetryDelay
        );
      }
    } finally {
      await testTeardown(testContext);
    }
  };
}
