# `it.should[.not].beLessThanOrEqual()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beLessThanOrEqual(600));
});
```

## Example output

```fundamental
Example: it.should[.not].beLessThanOrEqual()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be less than or equal 700
  ✓ Assert: The height of the window should not be less than or equal 600
```
