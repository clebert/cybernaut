# @cybernaut/engine

> An engine for reliably asserting/verifying conditions and for reliably performing actions.

## Installation

```sh
npm install --save @cybernaut/engine
```

## Compatible APIs

- [`@cybernaut/chrome`][cybernaut-chrome]
- `@cybernaut/selenium` (planned)

## Usage example

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

```ts
export interface EngineOptions {
  readonly retries: number; // Default: 4
  readonly retryDelay: number; // Default: 1000
}

export declare class Engine {
  constructor(options?: Partial<EngineOptions>);

  assert<T>(condition: Condition<T>): Promise<void>;
  perform<T>(action: Action<T>): Promise<T>;
  verify<T>(condition: Condition<T>): Promise<boolean>;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[cybernaut-chrome]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/chrome
