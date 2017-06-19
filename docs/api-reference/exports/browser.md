# `browser`

* [`browser.defineElement()`](#browserdefineelement)
* [`browser.elementCount()`](#browserelementcount)
* [`browser.executeScript()`](#browserexecutescript)
* [`browser.loadPage()`](#browserloadpage)
* [`browser.navigateBack()`](#browsernavigateback)
* [`browser.navigateForward()`](#browsernavigateforward)
* [`browser.pageTitle`](#browserpagetitle)
* [`browser.pageUrl`](#browserpageurl)
* [`browser.reloadPage()`](#browserreloadpage)
* [`browser.scriptResult()`](#browserscriptresult)
* [`browser.setWindowPosition()`](#browsersetwindowposition)
* [`browser.setWindowSize()`](#browsersetwindowsize)
* [`browser.windowHeight`](#browserwindowheight)
* [`browser.windowWidth`](#browserwindowwidth)
* [`browser.windowXPosition`](#browserwindowxposition)
* [`browser.windowYPosition`](#browserwindowyposition)

## `browser.defineElement()`

### Type definition

```ts
function defineElement(name: string, selector: string, index?: number): SeleniumElement;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: browser.defineElement()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
```

### Example output

```fundamental
Example: browser.defineElement()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The existence of the search-field element should equal true
```

### Information

If the specified `selector` matches more than one element, an element other than the first one can be selected using the zero-based `index` parameter.

## `browser.elementCount()`

### Type definition

```ts
function elementCount(selector: string): SeleniumAccessor<number>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.elementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.elementCount('#lst-ib'), it.should.equal(1));
});
```

### Example output

```fundamental
Example: browser.elementCount()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The count of matching elements for the specified selector (#lst-ib) should equal 1
```

## `browser.executeScript()`

### Type definition

```ts
type ActionScript = (callback: () => void) => void;

function executeScript(scriptName: string, script: ActionScript): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.executeScript()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(
    browser.executeScript('example', callback => {
      // This function will be executed in the browser context,
      // so any references to the outer scope won't work.

      callback(); // Do not forget to call the callback function!
    })
  );
});
```

### Example output

```fundamental
Example: browser.executeScript()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Execute the example script
```

## `browser.loadPage()`

### Type definition

```ts
function loadPage(url: string): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.loadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));
});
```

### Example output

```fundamental
Example: browser.loadPage()
  ✓ Perform: Load the page at https://www.google.com/ncr
```

## `browser.navigateBack()`

### Type definition

```ts
function navigateBack(): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.navigateBack()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.navigateBack());
});
```

### Example output

```fundamental
Example: browser.navigateBack()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Navigate back
```

## `browser.navigateForward()`

### Type definition

```ts
function navigateForward(): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.navigateForward()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.navigateForward());
});
```

### Example output

```fundamental
Example: browser.navigateForward()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Navigate forward
```

## `browser.pageTitle`

### Type definition

```ts
const pageTitle: SeleniumAccessor<string>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.pageTitle', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
});
```

### Example output

```fundamental
Example: browser.pageTitle
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The title of the page should equal 'Google'
```

## `browser.pageUrl`

### Type definition

```ts
const pageUrl: SeleniumAccessor<string>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.pageUrl', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageUrl, it.should.equal('https://www.google.com/'));
});
```

### Example output

```fundamental
Example: browser.pageUrl
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The URL of the page should equal 'https://www.google.com/'
```

## `browser.reloadPage()`

### Type definition

```ts
function reloadPage(): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.reloadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.reloadPage());
});
```

### Example output

```fundamental
Example: browser.reloadPage()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Reload the page
```

## `browser.scriptResult()`

### Type definition

```ts
type AccessorScript<T> = (callback: (result: T) => void) => void;

function scriptResult<T>(scriptName: string, script: AccessorScript<T>): SeleniumAccessor<T>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.scriptResult()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    browser.scriptResult('example', callback => {
      // This function will be executed in the browser context,
      // so any references to the outer scope won't work.

      callback('foo');
    }),
    it.should.equal('foo')
  );
});
```

### Example output

```fundamental
Example: browser.scriptResult()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The result of the example script should equal 'foo'
```

## `browser.setWindowPosition()`

### Type definition

```ts
function setWindowPosition(x: number, y: number): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.setWindowPosition()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowPosition(22, 7));
});
```

### Example output

```fundamental
Example: browser.setWindowPosition()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Set the window position to 22,7
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/

## `browser.setWindowSize()`

### Type definition

```ts
function setWindowSize(width: number, height: number): SeleniumAction;
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.setWindowSize()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowSize(640, 480));
});
```

### Example output

```fundamental
Example: browser.setWindowSize()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Set the window size to 640x480
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/

## `browser.windowHeight`

### Type definition

```ts
const windowHeight: SeleniumAccessor<number>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.windowHeight', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.equal(700));
});
```

### Example output

```fundamental
Example: browser.windowHeight
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the window should equal 700
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/

## `browser.windowWidth`

### Type definition

```ts
const windowWidth: SeleniumAccessor<number>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.windowWidth', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowWidth, it.should.equal(1050));
});
```

### Example output

```fundamental
Example: browser.windowWidth
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The width of the window should equal 1050
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/

## `browser.windowXPosition`

### Type definition

```ts
const windowXPosition: SeleniumAccessor<number>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.windowXPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowXPosition, it.should.equal(10));
});
```

### Example output

```fundamental
Example: browser.windowXPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The X position of the window should equal 10
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/

## `browser.windowYPosition`

### Type definition

```ts
const windowYPosition: SeleniumAccessor<number>;
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.windowYPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowYPosition, it.should.equal(10));
});
```

### Example output

```fundamental
Example: browser.windowYPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The Y position of the window should equal 10
```

### Known issues

* This feature is [supported by Firefox only from version 53 onwards][firefox-bug]. At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/
