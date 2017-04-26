# Interface `Test`

## Methods

* [`assert`](#method-assert)
* [`perform`](#method-perform)
* [`verify`](#method-verify)
* [`fail`](#method-fail)
* [`pass`](#method-pass)

### Method `assert`

Type definition:

* **`assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // Throws an error if the condition isn't met
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

*Note: An assertion is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

### Method `perform`

Type definition:

* **`perform(action: Action, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  // Throws an error if the action fails
  await t.perform(browser.loadPage('http://bar.baz'));
});
```

*Note: A performance is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

### Method `verify`

Type definition:

* **`verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<boolean>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // Evaluates to false if the condition isn't met
  if (await t.verify(browser.pageTitle, it.should.contain('bar'))) {
    // ...
  }
});
```

*Note: A verification is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

### Method `fail`

Type definition:

* **`fail(message: string, cause: Error): void`**

Example TAP output: `not ok 1 - bar (cause: baz)`

Example usage:

```js
const {test} = require('cybernaut');

test('foo', async t => {
  // Throws a new error
  t.fail('bar', new Error('baz'));
});
```

### Method `pass`

Type definition:

* **`pass(message: string): void`**

Example TAP output: `ok 1 - bar`

Example usage:

```js
const {test} = require('cybernaut');

test('foo', async t => {
  // Prints a successful-test line in TAP format on standard output
  t.pass('bar');
});
```
