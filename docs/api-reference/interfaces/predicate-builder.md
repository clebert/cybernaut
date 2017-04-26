# Interface `PredicateBuilder`

## Methods

* [`contain`](#method-contain)
* [`not.contain`](#method-notcontain)
* [`equal`](#method-equal)
* [`not.equal`](#method-notequal)
* [`match`](#method-match)
* [`not.match`](#method-notmatch)
* [`be.above`](#method-beabove)
* [`be.at.least`](#method-beatleast)
* [`be.below`](#method-bebelow)
* [`be.at.most`](#method-beatmost)

### Method `contain`

Type definition:

* **`contain(expectedValue: string): Predicate<string>`**

Example TAP output: `ok 1 - page title should contain 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

### Method `not.contain`

Type definition:

* **`not.contain(expectedValue: string): Predicate<string>`**

Example TAP output: `ok 1 - page title should not contain 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.contain('bar'));
});
```

### Method `equal`

Type definition:

* **`equal<T>(expectedValue: T): Predicate<T>`**

Example TAP output: `ok 1 - page title should equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.equal('bar'));
});
```

*Note: The comparison is performed with deep-strict-equal.*

### Method `not.equal`

Type definition:

* **`not.equal<T>(expectedValue: T): Predicate<T>`**

Example TAP output: `ok 1 - page title should not equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.equal('bar'));
});
```

*Note: The comparison is performed with deep-strict-equal.*

### Method `match`

Type definition:

* **`match(regex: RegExp): Predicate<string>`**

Example TAP output: `ok 1 - page title should match /bar/ (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.match(/bar/));
});
```

### Method `not.match`

Type definition:

* **`not.match(regex: RegExp): Predicate<string>`**

Example TAP output: `ok 1 - page title should not match /bar/ (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.match(/bar/));
});
```

### Method `be.above`

Type definition:

* **`be.above(expectedValue: number): Predicate<number>`**

Example TAP output: `ok 1 - window width should be above 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth > 123
  await t.assert(browser.windowWidth, it.should.be.above(123));
});
```

### Method `be.at.least`

Type definition:

* **`be.at.least(expectedValue: number): Predicate<number>`**

Example TAP output: `ok 1 - window width should be at least 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth >= 123
  await t.assert(browser.windowWidth, it.should.be.at.least(123));
});
```

### Method `be.below`

Type definition:

* **`be.below(expectedValue: number): Predicate<number>`**

Example TAP output: `ok 1 - window width should be below 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth < 123
  await t.assert(browser.windowWidth, it.should.be.below(123));
});
```

### Method `be.at.most`

Type definition:

* **`be.at.most(expectedValue: number): Predicate<number>`**

Example TAP output: `ok 1 - window width should be at most 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  // windowWidth <= 123
  await t.assert(browser.windowWidth, it.should.be.at.most(123));
});
```
