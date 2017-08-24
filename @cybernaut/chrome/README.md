# @cybernaut/chrome

> A [`@cybernaut/engine`][cybernaut-engine]-compatible API for [Google Chrome][google-chrome].

*Note: This API is still work-in-progress and therefore incomplete and unstable.* 🔥

## Installation

```sh
npm install --save @cybernaut/chrome @cybernaut/engine
```

*Note: [`@cybernaut/engine`][cybernaut-engine] is a peer dependency of `@cybernaut/chrome`.*

## Usage examples (JavaScript)

### Vanilla

```js
// TODO
```

### [Jest][jest]

```js
// TODO
```

## Type definitions

### @cybernaut/chrome/lib/Device

```ts
export interface DeviceOptions {
  readonly scaleFactor: number; // Default: 0
  readonly mobile: boolean; // Default: false
  readonly touch: boolean; // Default: false
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
  public navigate(url: string, waitUntilLoaded: boolean = false): Action<void>;
  public captureScreenshot(writeToFile: boolean = false): Action<string>;
  public quit(): Promise<void>;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[cybernaut-engine]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine
[google-chrome]: https://www.google.com/chrome/
[jest]: https://facebook.github.io/jest/
