# @cybernaut/engine

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

## Installation

```sh
npm install --save @cybernaut/engine
```

## Compatible APIs

- [`@cybernaut/chrome`][package-chrome]

## Usage example

```js
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform, verify} = new Engine({
  retries: 1,
  retryDelay: 500
});

(async () => {
  await assert(anyCondition);

  await perform(anyAction);

  if (await verify(anyCondition)) {
    /* Do something ... */
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
```

*Note: This example uses language features of ECMAScript 2017.
Particularly useful are [async functions][external-async-function] which are natively supported by [Node.js][external-nodejs] 7.6.0 or later.*

## Type definitions

### External imports

- [`@cybernaut/types/lib/Action`][type-definition-action]
- [`@cybernaut/types/lib/Condition`][type-definition-condition]

### @cybernaut/engine/lib/Engine

```ts
import {Action} from '@cybernaut/types/lib/Action';
import {Condition} from '@cybernaut/types/lib/Condition';

export interface EngineOptions {
  readonly retries: number; /* Default: 4 */
  readonly retryDelay: number; /* Default: 1000 */
}

export class Engine {
  public constructor(options?: Partial<EngineOptions>);

  public assert<T>(condition: Condition<T>): Promise<void>;
  public perform<T>(action: Action<T>): Promise<T>;
  public verify<T>(condition: Condition<T>): Promise<boolean>;
}
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/engine.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/engine
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[package-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome

[type-definition-action]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibaction
[type-definition-condition]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibcondition

[external-async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[external-nodejs]: https://nodejs.org/en/
