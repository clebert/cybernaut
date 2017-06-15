# `browser.executeScript()`

## Type definition

```ts
type ActionScript = (callback: () => void) => void;

function executeScript(scriptName: string, script: ActionScript): SeleniumAction;
```

## Example usage

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

## Example output

```fundamental
Example: browser.executeScript()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Execute the example script
```
