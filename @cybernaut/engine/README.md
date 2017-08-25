# @cybernaut/engine

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]
[![GitHub Stars][badge-github-image]][badge-github-link]

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

## Installation

```sh
npm install --save @cybernaut/engine
```

## Compatible APIs

- [`@cybernaut/chrome`][package-chrome]

## Usage example (JavaScript)

```js
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform, verify} = new Engine({
  retries: 1,
  retryDelay: 500
});

(async () => {
  await assert(aCondition);

  await perform(anAction);

  if (await verify(aCondition)) {
    // Do something ...
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
```

## Type definitions

### External imports

- [`@cybernaut/types/lib/Action`][type-definition-action]
- [`@cybernaut/types/lib/Condition`][type-definition-condition]

### @cybernaut/engine/lib/Engine

```ts
import {Action} from '@cybernaut/types/lib/Action';
import {Condition} from '@cybernaut/types/lib/Condition';

export interface EngineOptions {
  readonly retries: number; // Default: 4
  readonly retryDelay: number; // Default: 1000
}

export class Engine {
  public constructor(options?: Partial<EngineOptions>);

  public assert<T>(condition: Condition<T>): Promise<void>;
  public perform<T>(action: Action<T>): Promise<T>;
  public verify<T>(condition: Condition<T>): Promise<boolean>;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/engine.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/engine
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master
[badge-github-image]: https://img.shields.io/github/stars/clebert/cybernaut.svg?style=social&label=GitHub&style=plastic
[badge-github-link]: https://github.com/clebert/cybernaut

[package-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome

[type-definition-action]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibaction
[type-definition-condition]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibcondition
