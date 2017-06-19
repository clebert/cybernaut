# `it`

* [`it.should[.not].beBetween()`](#itshouldnotbebetween)
* [`it.should[.not].beGreaterThanOrEqual()`](#itshouldnotbegreaterthanorequal)
* [`it.should[.not].beGreaterThan()`](#itshouldnotbegreaterthan)
* [`it.should[.not].beLessThanOrEqual()`](#itshouldnotbelessthanorequal)
* [`it.should[.not].beLessThan()`](#itshouldnotbelessthan)
* [`it.should[.not].contain()`](#itshouldnotcontain)
* [`it.should[.not].equal()`](#itshouldnotequal)
* [`it.should[.not].match()`](#itshouldnotmatch)

## `it.should[.not].beBetween()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  beBetween(minValue: number, maxValue: number): Predicate<number>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beBetween()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beBetween(600, 800));
  await t.assert(browser.windowHeight, it.should.not.beBetween(400, 600));
});
```

### Example output

```fundamental
Example: it.should[.not].beBetween()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be between 600 and 800, inclusive
  ✓ Assert: The height of the window should not be between 400 and 600, inclusive
```

### Information

Both values minValue and maxValue are inclusive.

## `it.should[.not].beGreaterThanOrEqual()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  beGreaterThanOrEqual(value: number): Predicate<number>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThanOrEqual(800));
});
```

### Example output

```fundamental
Example: it.should[.not].beGreaterThanOrEqual()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be greater than or equal 700
  ✓ Assert: The height of the window should not be greater than or equal 800
```

## `it.should[.not].beGreaterThan()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  beGreaterThan(value: number): Predicate<number>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThan(600));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThan(700));
});
```

### Example output

```fundamental
Example: it.should[.not].beGreaterThan()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be greater than 600
  ✓ Assert: The height of the window should not be greater than 700
```

## `it.should[.not].beLessThanOrEqual()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  beLessThanOrEqual(value: number): Predicate<number>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beLessThanOrEqual(600));
});
```

### Example output

```fundamental
Example: it.should[.not].beLessThanOrEqual()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be less than or equal 700
  ✓ Assert: The height of the window should not be less than or equal 600
```

## `it.should[.not].beLessThan()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  beLessThan(value: number): Predicate<number>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThan(800));
  await t.assert(browser.windowHeight, it.should.not.beLessThan(700));
});
```

### Example output

```fundamental
Example: it.should[.not].beLessThan()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be less than 800
  ✓ Assert: The height of the window should not be less than 700
```

## `it.should[.not].contain()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  contain(value: string): Predicate<string>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].contain()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.contain('Goo'));
  await t.assert(browser.pageTitle, it.should.not.contain('Yah'));
});
```

### Example output

```fundamental
Example: it.should[.not].contain()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should contain 'Goo'
  ✓ Assert: The title of the page should not contain 'Yah'
```

## `it.should[.not].equal()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  equal<T>(value: T): Predicate<T>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].equal()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
  await t.assert(browser.pageTitle, it.should.not.equal('Yahoo'));
});
```

### Example output

```fundamental
Example: it.should[.not].equal()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should equal 'Google'
  ✓ Assert: The title of the page should not equal 'Yahoo'
```

### Information

The comparison is performed with deep-strict-equal.

## `it.should[.not].match()`

### Type definition

```ts
class PredicateBuilder {
  readonly not: PredicateBuilder;

  match(value: RegExp): Predicate<string>;
}

class It {
  readonly should: PredicateBuilder;
}

const it: It;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].match()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.match(/Goo/));
  await t.assert(browser.pageTitle, it.should.not.match(/Yah/));
});
```

### Example output

```fundamental
Example: it.should[.not].match()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should match /Goo/
  ✓ Assert: The title of the page should not match /Yah/
```
