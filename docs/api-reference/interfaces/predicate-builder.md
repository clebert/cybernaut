# Interface `PredicateBuilder`

## Properties

* [`not`](#property-not)

## Methods

* [`contain`](#method-contain)
* [`equal`](#method-equal)
* [`match`](#method-match)
* [`beBetween`](#method-bebetween)
* [`beGreaterThan`](#method-begreaterthan)
* [`beGreaterThanOrEqual`](#method-begreaterthanorequal)
* [`beLessThan`](#method-belessthan)
* [`beLessThanOrEqual`](#method-belessthanorequal)

### Property `not`

Type definition:

* **`not: PredicateBuilder`**

### Method `contain`

Type definition:

* **`contain(value: string): Predicate<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.pageTitle, it.should.contain('pageTitle'));

  await t.assert(browser.pageTitle, it.should.not.contain('pageTitle'));
});
```

### Method `equal`

Type definition:

* **`equal<T>(value: T): Predicate<T>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.pageTitle, it.should.equal('pageTitle'));

  await t.assert(browser.pageTitle, it.should.not.equal('pageTitle'));
});
```

*Note: The comparison is performed with deep-strict-equal.*

### Method `match`

Type definition:

* **`match(value: RegExp): Predicate<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.pageTitle, it.should.match(/pageTitle/));

  await t.assert(browser.pageTitle, it.should.not.match(/pageTitle/));
});
```

### Method `beBetween`

Type definition:

* **`beBetween(minValue: number, maxValue: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // windowWidth >= 123 && windowWidth <= 456
  await t.assert(browser.windowWidth, it.should.beBetween(123, 456));

  // windowWidth < 123 || windowWidth > 456
  await t.assert(browser.windowWidth, it.should.not.beBetween(123, 456));
});
```

*Note: Both values `minValue` and `maxValue` are inclusive.*

### Method `beGreaterThan`

Type definition:

* **`beGreaterThan(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // windowWidth > 123
  await t.assert(browser.windowWidth, it.should.beGreaterThan(123));

  // windowWidth <= 123
  await t.assert(browser.windowWidth, it.should.not.beGreaterThan(123));
});
```

### Method `beGreaterThanOrEqual`

Type definition:

* **`beGreaterThanOrEqual(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // windowWidth >= 123
  await t.assert(browser.windowWidth, it.should.beGreaterThanOrEqual(123));

  // windowWidth < 123
  await t.assert(browser.windowWidth, it.should.not.beGreaterThanOrEqual(123));
});
```

### Method `beLessThan`

Type definition:

* **`beLessThan(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // windowWidth < 123
  await t.assert(browser.windowWidth, it.should.beLessThan(123));

  // windowWidth >= 123
  await t.assert(browser.windowWidth, it.should.not.beLessThan(123));
});
```

### Method `beLessThanOrEqual`

Type definition:

* **`beLessThanOrEqual(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  // windowWidth <= 123
  await t.assert(browser.windowWidth, it.should.beLessThanOrEqual(123));

  // windowWidth > 123
  await t.assert(browser.windowWidth, it.should.not.beLessThanOrEqual(123));
});
```
