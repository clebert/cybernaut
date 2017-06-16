# `element.sendKeys()`

## Type definition

```ts
class SeleniumElement {
  sendKeys(...keys: string[]): SeleniumAction;
}
```

## Example usage

```ts
import {Key, browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.sendKeys()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(
    searchField.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is')
  );
});
```

## Example output

```fundamental
Example: element.sendKeys()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Send the specified keys ('text was', Key.CONTROL, 'a', Key.NULL, 'now text is') to the search-field element
```

## Information

> Modifier keys ([Key.SHIFT][webdriver-key], [Key.CONTROL][webdriver-key], [Key.ALT][webdriver-key], [Key.META][webdriver-key]) are stateful; once a modifier is processed in the keysequence, that key state is toggled until one of the following occurs:
>
> * The modifier key is encountered again in the sequence. At this point the state of the key is toggled (along with the appropriate keyup/down events).
>
> * The [Key.NULL][webdriver-key] key is encountered in the sequence. When this key is encountered, all modifier keys current in the down state are released (with accompanying keyup events).
>
> * The end of the keysequence is encountered. When there are no more keys to type, all depressed modifier keys are released (with accompanying keyup events).
>
> — *[selenium-webdriver.WebElement][webdriver-webelement]*

*Note: The `WebElement` of selenium-webdriver is used internally, but is not accessible from the outside.*

## Known issues

* This feature [does not work][geckodriver-issue-683] in Firefox with the current version (3.4.0) of selenium-webdriver.

[geckodriver-issue-683]: https://github.com/mozilla/geckodriver/issues/683
[webdriver-key]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
[webdriver-webelement]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html
