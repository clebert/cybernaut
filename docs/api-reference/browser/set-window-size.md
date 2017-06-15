# `browser.setWindowSize()`

## Type definition

```ts
function setWindowSize(width: number, height: number): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.setWindowSize()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowSize(640, 480));
});
```

## Example output

```fundamental
Example: browser.setWindowSize()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Set the window size to 640x480
```

## Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/
