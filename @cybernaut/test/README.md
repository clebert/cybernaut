# @cybernaut/test

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> A solution for writing reliable tests using any Web UI testing framework.

## Installation

```sh
npm install @cybernaut/test
```

## Modules

### @cybernaut/test/lib/TestRunner

```ts
export declare type TestSetup<T> = () => Promise<T>;
export declare type TestTeardown<T> = (testContext: T) => Promise<void>;

export interface TestOptions {
  readonly testStepMaxRetries?: number; /* Default: 4 */
  readonly testStepRetryDelay?: number; /* Default: 1000 */
}

export declare type TestStep<T> = (testContext: T) => Promise<void>;
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
