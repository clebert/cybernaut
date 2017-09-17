# @cybernaut/test

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> A solution for writing reliable tests using any Web UI testing framework.

## Installation

```sh
npm install @cybernaut/test
```

## Getting started

Cybernaut provides a testing-framework independent test runner,
that reliably performs individual test steps using a retry mechanism.

### Example

The following example uses language features of ECMAScript 2017.
Particularly useful are [async functions][external-async-function] which are natively supported by [Node.js][external-nodejs] 7.6.0 or later.

```ts
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

const test = run((testContext) => [
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

test();

/* Jest / Mocha */

it('should run reliably', test);
```

### Vanilla output

```sh
test step 1: error
test step 1: error
test step 1: ok
test step 2: ok
attempts: 3
```

### More examples

You can find more examples with [Puppeteer][external-puppeteer] and [Jest][external-jest] in the [`@cybernaut/puppeteer` README][readme-puppeteer].

## Type definitions

### @cybernaut/test/lib/TestRunner

```ts
export declare type TestSetup<T> = () => Promise<T>;
export declare type TestTeardown<T> = (testContext: T) => Promise<void>;

export interface TestOptions {
  readonly testStepMaxRetries?: number; /* Default: 4 */
  readonly testStepRetryDelay?: number; /* Default: 1000 ms */
}

export declare type TestStep<T> = (testContext: T) => Promise<any>;
export declare type TestCase<T> = (testContext: T) => TestStep<T>[];
export declare type Test = () => Promise<void>;
export declare type TestRunner<T> = (testCase: TestCase<T>) => Test;

export declare function createTestRunner<T>(
  testSetup: TestSetup<T>,
  testTeardown: TestTeardown<T>,
  testOptions?: TestOptions
): TestRunner<T>;
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/test.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/test
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[package-puppeteer]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/puppeteer

[readme-puppeteer]: https://github.com/clebert/cybernaut/blob/master/@cybernaut/puppeteer/README.md

[external-async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[external-jest]: https://facebook.github.io/jest/
[external-nodejs]: https://nodejs.org/en/
[external-puppeteer]: https://github.com/GoogleChrome/puppeteer
