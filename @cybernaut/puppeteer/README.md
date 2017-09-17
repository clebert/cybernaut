# @cybernaut/puppeteer

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Convenience functions for using [Puppeteer][external-puppeteer] with [`@cybernaut/test`][package-test].

## Installation

```sh
npm install @cybernaut/puppeteer
```

## Examples (using [Jest][external-jest])

**Tip 💡** [Jest][external-jest] allows the parallel execution of multiple test files using the [`--maxWorkers` CLI option][external-jest-maxworkers].
For this reason, a file should always contain only one test.
Thus, the execution speed of your entire test suite can be increased massively.

### Navigating to [https://example.com][external-example] and asserting the page title

```js
const {
  createTestSetup,
  createTestTeardown
} = require('@cybernaut/puppeteer/lib/TestContext');

const {createTestRunner} = require('@cybernaut/test/lib/TestRunner');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000; /* 30 seconds */

const run = createTestRunner(createTestSetup(), createTestTeardown());

test(
  'Navigating to https://example.com and asserting the page title',
  run(({page}) => [
    async () => page.goto('https://example.com'),
    async () => expect(page.title()).resolves.toBe('Example Domain')
  ])
);
```

### Sign in to a fictitious "My Account" page

**Tip 💡** A single test step should include only one user action.
If such a test step fails, then it can be repeated without side effects.

#### Bad example ❌

```js
test(
  'Sign in to a fictitious "My Account" page',
  run(({page}) => [
    async () => {
      await page.goto('https://example.com');

      await expect(page.title()).resolves.toBe('Sign In');

      await page.focus('input#username');
      await page.type('username@example.com', {delay: 100});

      await page.focus('input#password');
      await page.type('123456', {delay: 100});

      await page.click('button#submit-button');

      await expect(page.title()).resolves.toBe('My Account');
    }
  ])
);
```

#### Good example ✅

```js
test(
  'Sign in to a fictitious "My Account" page',
  run(({page}) => [
    async () => page.goto('https://example.com'),
    async () => expect(page.title()).resolves.toBe('Sign In'),
    async () => page.focus('input#username'),
    async () => page.type('username@example.com', {delay: 100}),
    async () => page.focus('input#password'),
    async () => page.type('123456', {delay: 100}),
    async () => page.click('button#submit-button'),
    async () => expect(page.title()).resolves.toBe('My Account')
  ])
);
```

## Type definitions

Because of the lack of publicly available [TypeScript][external-typescript] type definitions for [Puppeteer][external-puppeteer], this package provides its own.

**Attention ⚠️** The [TypeScript][external-typescript] type definitions for [Puppeteer][external-puppeteer] are [not yet complete][issue-391].

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

[issue-391]: https://github.com/clebert/cybernaut/issues/391

[external-example]: https://example.com
[external-jest]: https://facebook.github.io/jest/
[external-jest-maxworkers]: https://facebook.github.io/jest/docs/en/cli.html#maxworkers-num
[external-puppeteer]: https://github.com/GoogleChrome/puppeteer
[external-typescript]: http://www.typescriptlang.org/
