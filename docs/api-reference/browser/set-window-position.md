# `browser.setWindowPosition()`

## Type definition

```ts
function setWindowPosition(x: number, y: number): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.setWindowPosition()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowPosition(22, 7));
});
```

## Example output

```fundamental
Example: browser.setWindowPosition()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Set the window position to 22,7
```

## Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/
