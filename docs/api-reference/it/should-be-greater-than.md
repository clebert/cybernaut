# `it.should[.not].beGreaterThan()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThan(600));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThan(700));
});
```

## Example output

```fundamental
Example: it.should[.not].beGreaterThan()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be greater than 600
  ✓ Assert: The height of the window should not be greater than 700
```
