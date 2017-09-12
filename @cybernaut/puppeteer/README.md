# @cybernaut/puppeteer

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Convenience functions for using [Puppeteer][external-puppeteer] with [@cybernaut/test][package-test].

## Installation

```sh
npm install @cybernaut/puppeteer
```

## Usage examples

### [Jest][external-jest] + [Puppeteer][external-puppeteer]

```ts
const {
  createTestSetup,
  createTestTeardown
} = require('@cybernaut/puppeteer/lib/TestContext');

const {createTestRunner} = require('@cybernaut/test/lib/TestRunner');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const run = createTestRunner(createTestSetup(), createTestTeardown());

test(
  'Navigating to https://example.com and asserting the page title',
  run(({page}) => [
    async () => {
      const response = await page.goto('https://example.com');

      expect(response.ok).toBe(true);
    },
    async () => {
      expect(await page.title()).toBe('Example Domain');
    }
  ])
);
```

*Note: This example uses language features of ECMAScript 2017.
Particularly useful are [async functions][external-async-function] which are natively supported by [Node.js][external-nodejs] 7.6.0 or later.*

## Modules

### @cybernaut/puppeteer/lib/TestContext

```ts
import {TestSetup, TestTeardown} from '@cybernaut/test/lib/TestRunner';
import {Browser, LaunchOptions, Page} from 'puppeteer';

export interface TestContext {
  readonly browser: Browser;
  readonly page: Page;
}

export declare function createTestSetup(
  launchOptions?: LaunchOptions
): TestSetup<TestContext>;

export declare function createTestTeardown(): TestTeardown<TestContext>;
```

*Note: Because of the lack of publicly available [TypeScript][external-typescript] type definitions for [Puppeteer][external-puppeteer], this package provides its own.*

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/puppeteer.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/puppeteer
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[package-test]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/test

[external-async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[external-jest]: https://facebook.github.io/jest/
[external-nodejs]: https://nodejs.org/en/
[external-puppeteer]: https://github.com/GoogleChrome/puppeteer
[external-typescript]: http://www.typescriptlang.org/
