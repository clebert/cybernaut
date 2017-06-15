# `it.should[.not].beLessThan()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThan(800));
  await t.assert(browser.windowHeight, it.should.not.beLessThan(700));
});
```

## Example output

```fundamental
Example: it.should[.not].beLessThan()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should be less than 800
  ✓ Assert: The height of the window should not be less than 700
```
