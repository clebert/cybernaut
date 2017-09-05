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

### [Vanilla][external-vanilla-software]

```js
const {Chrome} = require('@cybernaut/chrome/lib/Chrome');
const {iPhone5} = require('@cybernaut/chrome/lib/MobileDevice');
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform} = new Engine();

(async () => {
  const chrome = await Chrome.launch();

  try {
    await perform(chrome.navigateTo('https://www.example.com/'));
    await perform(chrome.emulateMobileDevice(iPhone5()));

    await assert(chrome.pageTitle.is.equalTo('Example Domain'));

    console.info(await perform(chrome.captureScreenshot()));
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
const {iPhone5} = require('@cybernaut/chrome/lib/MobileDevice');
const {Engine} = require('@cybernaut/engine/lib/Engine');

/* Automated Web UI tests usually run much longer than unit tests,
 * so the default timeout should be adjusted accordingly.
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine();

let chrome;

beforeEach(async () => {
  chrome = await Chrome.launch();
});

afterEach(async () => {
  await chrome.quit();
});

test('example.com', async () => {
  await perform(chrome.navigateTo('https://www.example.com/'));
  await perform(chrome.emulateMobileDevice(iPhone5()));

  await assert(chrome.pageTitle.is.equalTo('Example Domain'));

  console.info(await perform(chrome.captureScreenshot()));
});
```

*Note: Both examples use language features of ECMAScript 2017.
Particularly useful are [async functions][external-async-function] which are natively supported by [Node.js][external-nodejs] 7.6.0 or later.*

## Type definitions

### External imports

- [`@cybernaut/core/lib/Property`][type-definition-property]
- [`@cybernaut/types/lib/Action`][type-definition-action]

### @cybernaut/chrome/lib/DOMNode

*Note: An instance of this class can be obtained from the `Chrome.rootNode` property.
The `DOMNode()` constructor is considered to be a private API.*

```ts
import {Property} from '@cybernaut/core/lib/Property';

export class DOMNode {
  public readonly html: Property;

  public descendantNode(selector: string, index?: number): DOMNode;
}
```

### @cybernaut/chrome/lib/MobileDevice

```ts
export interface MobileDevice {
  readonly width: number;
  readonly height: number;
  readonly pixelRatio: number;
  readonly userAgent: string;
}

export function iPadMini(horizontal: boolean = false): MobileDevice;
export function iPad(horizontal: boolean = false): MobileDevice;
export function iPadPro(horizontal: boolean = false): MobileDevice;

export function iPhone4(horizontal: boolean = false): MobileDevice;
export function iPhone5(horizontal: boolean = false): MobileDevice;
export function iPhone6(horizontal: boolean = false): MobileDevice;
export function iPhone6Plus(horizontal: boolean = false): MobileDevice;

export function Nexus4(horizontal: boolean = false): MobileDevice;
export function Nexus5(horizontal: boolean = false): MobileDevice;
export function Nexus5X(horizontal: boolean = false): MobileDevice;
export function Nexus6(horizontal: boolean = false): MobileDevice;
export function Nexus6P(horizontal: boolean = false): MobileDevice;
export function Nexus7(horizontal: boolean = false): MobileDevice;
export function Nexus10(horizontal: boolean = false): MobileDevice;
```

### @cybernaut/chrome/lib/Chrome

*Note: An instance of this class can be obtained from the `Chrome.launch()` static method.
The `Chrome()` constructor is considered to be a private API.*

```ts
import {DOMNode} from '@cybernaut/chrome/lib/DOMNode';
import {MobileDevice} from '@cybernaut/chrome/lib/MobileDevice';
import {Property} from '@cybernaut/core/lib/Property';
import {Action} from '@cybernaut/types/lib/Action';

export type Script<T = any> = (...args: any[]) => T;

export class Chrome {
  public static launch(headless: boolean = true): Promise<Chrome>;

  public readonly headless: boolean;

  public readonly rootNode: DOMNode;

  public readonly pageTitle: Property;
  public readonly pageUrl: Property;

  public scriptResult(script: Script, ...args: any[]): Property;

  public navigateTo(
    url: string,
    waitUntilLoaded: boolean = false
  ): Action<void>;

  public runScript<T>(script: Script<T>, ...args: any[]): Action<T>;

  public emulateMobileDevice(
    mobileDevice: MobileDevice,
    fitWindow: boolean = true
  ): Action<void>;

  public captureScreenshot(
    writeToFile: boolean = process.env.CI !== 'true'
  ): Action<string>;

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
[type-definition-property]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core#cybernautcorelibproperty

[external-async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[external-google-chrome]: https://www.google.com/chrome/
[external-jest]: https://facebook.github.io/jest/
[external-nodejs]: https://nodejs.org/en/
[external-vanilla-software]: https://en.wikipedia.org/wiki/Vanilla_software
