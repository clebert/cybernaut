# `it.should[.not].contain()`

## Type definition

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

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].contain()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.contain('Goo'));
  await t.assert(browser.pageTitle, it.should.not.contain('Yah'));
});
```

## Example output

```fundamental
Example: it.should[.not].contain()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should contain 'Goo'
  ✓ Assert: The title of the page should not contain 'Yah'
```
