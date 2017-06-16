# `it.should[.not].beBetween()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beBetween()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beBetween(600, 800));
  await t.assert(browser.windowHeight, it.should.not.beBetween(400, 600));
});
```

## Example output

```fundamental
Example: it.should[.not].beBetween()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be between 600 and 800, inclusive
  ✓ Assert: The height of the window should not be between 400 and 600, inclusive
```

## Information

Both values minValue and maxValue are inclusive.
