# `browser.windowXPosition`

## Type definition

```ts
const windowXPosition: SeleniumAccessor<number>;
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.windowXPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowXPosition, it.should.equal(10));
});
```

## Example output

```fundamental
Example: browser.windowXPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The X position of the window should equal 10
```

## Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/
