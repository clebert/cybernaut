# `it.should[.not].beGreaterThanOrEqual()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThanOrEqual(800));
});
```

## Example output

```fundamental
Example: it.should[.not].beGreaterThanOrEqual()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be greater than or equal 700
  ✓ Assert: The height of the window should not be greater than or equal 800
```
