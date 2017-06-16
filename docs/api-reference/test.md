# `test()`

## Type definition

```ts
type SeleniumTest = (t: SeleniumTestContext, config: SeleniumConfig) => Promise<void>;

const test: {
  (name: string, implementation: SeleniumTest): void;

  only(name: string, implementation: SeleniumTest): void;
  skip(name: string, implementation: SeleniumTest): void;
  todo(name: string): void;
};
```

## Example usage

```ts
import {test} from 'cybernaut';

test('Example: test()', async t => {
  // Write the implementation of your test here.
});

test.only('Example: test.only()', async t => {
  // Write the implementation of your test here.
});

test.skip('Example: test.skip()', async t => {
  // Write the implementation of your test here.
});

test.todo('Example: test.todo()');
```
