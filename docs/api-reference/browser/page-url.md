# `browser.pageUrl`

## Type definition

```ts
const pageUrl: SeleniumAccessor<string>;
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.pageUrl', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageUrl, it.should.equal('https://www.google.com/'));
});
```

## Example output

```fundamental
Example: browser.pageUrl
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The URL of the page should equal 'https://www.google.com/'
```
