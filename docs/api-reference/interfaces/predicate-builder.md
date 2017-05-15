# Interface `PredicateBuilder`

## Methods

* [`contain`](#method-contain)
* [`equal`](#method-equal)
* [`match`](#method-match)
* [`beAbove`](#method-beabove)
* [`beAtLeast`](#method-beatleast)
* [`beAtMost`](#method-beatmost)
* [`beBelow`](#method-bebelow)

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

### Method `beAbove`

Type definition:

* **`beAbove(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth > 123
  await t.assert(browser.windowWidth, it.should.beAbove(123));
});
```

### Method `beAtLeast`

Type definition:

* **`beAtLeast(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth >= 123
  await t.assert(browser.windowWidth, it.should.beAtLeast(123));
});
```

### Method `beAtMost`

Type definition:

* **`beAtMost(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth <= 123
  await t.assert(browser.windowWidth, it.should.beAtMost(123));
});
```

### Method `beBelow`

Type definition:

* **`beBelow(value: number): Predicate<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth < 123
  await t.assert(browser.windowWidth, it.should.beBelow(123));
});
```
