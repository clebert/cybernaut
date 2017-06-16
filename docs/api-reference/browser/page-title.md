# `browser.pageTitle`

## Type definition

```ts
const pageTitle: SeleniumAccessor<string>;
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.pageTitle', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
});
```

## Example output

```fundamental
Example: browser.pageTitle
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should equal 'Google'
```
