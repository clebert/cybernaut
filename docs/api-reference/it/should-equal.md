# `it.should[.not].equal()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].equal()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
  await t.assert(browser.pageTitle, it.should.not.equal('Yahoo'));
});
```

## Example output

```fundamental
Example: it.should[.not].equal()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should equal 'Google'
  ✓ Assert: The title of the page should not equal 'Yahoo'
```

## Information

The comparison is performed with deep-strict-equal.
