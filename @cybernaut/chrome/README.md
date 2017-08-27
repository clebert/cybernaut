# @cybernaut/chrome

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> A [`@cybernaut/engine`][package-engine]-compatible API for [Google Chrome][external-google-chrome].

**This API is still work-in-progress and therefore incomplete and unstable!** 🔥

## Installation

```sh
npm install --save @cybernaut/chrome @cybernaut/engine
```

*Note: [`@cybernaut/engine`][package-engine] is a peer dependency of `@cybernaut/chrome`.*

## Usage examples

Both examples use language features of ECMAScript 2017.
Particularly useful are [async functions][external-async-function] which are natively supported by [Node.js][external-nodejs] 7.6.0 or later.

### [Vanilla][external-vanilla-software]

```js
const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {Device} = require('@cybernaut/chrome/lib/Device');
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform} = new Engine();

(async () => {
  const chrome = await Chrome.launchHeadless();

  try {
    await perform(chrome.emulateDevice(Device.iPhone5()));
    await perform(chrome.navigateTo('https://www.example.com/'));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    const writeToFile = process.env.CI !== 'true';

    console.info(await perform(chrome.captureScreenshot(writeToFile)));
  } finally {
    await chrome.quit();
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
```

### [Jest][external-jest]

```js
const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {Device} = require('@cybernaut/chrome/lib/Device');
const {Engine} = require('@cybernaut/engine/lib/Engine');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine();

let chrome;

beforeEach(async () => {
  chrome = await Chrome.launchHeadless();
});

test('example.com', async () => {
  try {
    await perform(chrome.emulateDevice(Device.iPhone5()));
    await perform(chrome.navigateTo('https://www.example.com/'));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    const writeToFile = process.env.CI !== 'true';

    console.info(await perform(chrome.captureScreenshot(writeToFile)));
  } finally {
    await chrome.quit();
  }
});
```

## Type definitions

### External imports

- [`@cybernaut/core/lib/Describable`][type-definition-describable]
- [`@cybernaut/core/lib/StringProperty`][type-definition-string-property]
- [`@cybernaut/types/lib/Action`][type-definition-action]

### @cybernaut/chrome/lib/Device

```ts
export interface DeviceOptions {
  readonly scaleFactor: number; /* Default: 0 */
  readonly mobile: boolean; /* Default: false */
  readonly touch: boolean; /* Default: false */
}

export class Device {
  public static iPhone4(horizontal: boolean = false): Device;
  public static iPhone5(horizontal: boolean = false): Device;
  public static iPhone6(horizontal: boolean = false): Device;
  public static iPhone6Plus(horizontal: boolean = false): Device;

  public readonly width: number;
  public readonly height: number;
  public readonly userAgent: string;
  public readonly scaleFactor: number;
  public readonly mobile: boolean;
  public readonly touch: boolean;

  public constructor(width: number, height: number, userAgent: string, options?: Partial<DeviceOptions>);
}
```

### @cybernaut/chrome/lib/Chrome

```ts
import {Device} from '@cybernaut/chrome/lib/Device';
import {Describable} from '@cybernaut/core/lib/Describable';
import {StringProperty} from '@cybernaut/core/lib/StringProperty';
import {Action} from '@cybernaut/types/lib/Action';

export interface ChromeOptions {
  readonly chromeFlags: string[];
  readonly chromePath: string;
}

export class Chrome extends Describable {
  public static launch(options?: Partial<ChromeOptions>): Promise<Chrome>;
  public static launchHeadless(options?: Partial<ChromeOptions>): Promise<Chrome>;

  public readonly pageTitle: StringProperty;
  public readonly pageUrl: StringProperty;

  public emulateDevice(device: Device, fitWindow: boolean = false): Action<void>;
  public navigateTo(url: string, waitUntilLoaded: boolean = false): Action<void>;
  public captureScreenshot(writeToFile: boolean = false): Action<string>;
  public quit(): Promise<void>;
}
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/chrome.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/chrome
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine

[type-definition-action]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibaction
[type-definition-describable]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core#cybernautcorelibdescribable
[type-definition-string-property]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core#cybernautcorelibstringproperty

[external-async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[external-google-chrome]: https://www.google.com/chrome/
[external-jest]: https://facebook.github.io/jest/
[external-nodejs]: https://nodejs.org/en/
[external-vanilla-software]: https://en.wikipedia.org/wiki/Vanilla_software
