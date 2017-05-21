# Interface: `Test`

## Methods

* [`assert()`](#method-assert)
* [`perform()`](#method-perform)
* [`verify()`](#method-verify)

### Method: `assert()`

Type definition:

* **`assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, options?: Partial<Options>): Promise<void>`**
* `Options: {retries: number, retryDelay: number}`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // The following expression throws an error if the condition isn't met.
  await t.assert(browser.pageTitle, it.should.contain('pageTitle'));
});
```

*Note: An assertion is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

### Method: `perform()`

Type definition:

* **`perform(action: Action, options?: Partial<Options>): Promise<void>`**
* `Options: {retries: number, retryDelay: number}`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  // The following expression throws an error if the action fails.
  await t.perform(browser.loadPage('url'));
});
```

*Note: A performance is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

### Method: `verify()`

Type definition:

* **`verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, options?: Partial<Options>): Promise<boolean>`**
* `Options: {retries: number, retryDelay: number}`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // The following expression evaluates to false if the condition isn't met.
  if (await t.verify(browser.pageTitle, it.should.contain('pageTitle'))) {
    // ...
  }
});
```

*Note: A verification is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*
