# Interface `PredicateBuilder`

## Methods

* [`contain`](#method-contain)
* [`equal`](#method-equal)
* [`match`](#method-match)
* [`beGreaterThan`](#method-begreaterthan)
* [`beGreaterThanOrEqual`](#method-begreaterthanorequal)
* [`beLessThan`](#method-belessthan)
* [`beLessThanOrEqual`](#method-belessthanorequal)
* [`beBetween`](#method-bebetween)

### Method `contain`

Type definition:

* **`contain(value: string): Predicate<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

### Method `equal`

Type definition:

* **`equal<T>(value: T): Predicate<T>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.equal('bar'));
});
```

*Note: The comparison is performed with deep-strict-equal.*

### Method `match`

Type definition:

* **`match(value: RegExp): Predicate<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.match(/bar/));
});
```

### Method `beGreaterThan`

Type definition:

* **`beGreaterThan(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth > 123
  await t.assert(browser.windowWidth, it.should.beGreaterThan(123));
});
```

### Method `beGreaterThanOrEqual`

Type definition:

* **`beGreaterThanOrEqual(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth >= 123
  await t.assert(browser.windowWidth, it.should.beGreaterThanOrEqual(123));
});
```

### Method `beLessThan`

Type definition:

* **`beLessThan(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth < 123
  await t.assert(browser.windowWidth, it.should.beLessThan(123));
});
```

### Method `beLessThanOrEqual`

Type definition:

* **`beLessThanOrEqual(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth <= 123
  await t.assert(browser.windowWidth, it.should.beLessThanOrEqual(123));
});
```

### Method `beBetween`

Type definition:

* **`beBetween(minValue: number, maxValue: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth >= 123 && windowWidth <= 456
  await t.assert(browser.windowWidth, it.should.beBetween(123, 456));
});
```

*Note: Both values `minValue` and `maxValue` are inclusive.*
