# `browser.scriptResult()`

## Type definition

```ts
type AccessorScript<T> = (callback: (result: T) => void) => void;

function scriptResult<T>(scriptName: string, script: AccessorScript<T>): SeleniumAccessor<T>;
```

## Example usage

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

## Example output

```fundamental
Example: browser.scriptResult()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The result of the example script should equal 'foo'
```
