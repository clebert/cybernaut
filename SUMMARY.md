# Summary

## Overview

* [Testing with Docker](docs/overview/testing-with-docker.md)
* [Testing locally](docs/overview/testing-locally.md)
* [Configuring Cybernaut](docs/overview/configuring-cybernaut.md)
* [Related links](docs/overview/related-links.md)
* [Changelog](https://github.com/clebert/cybernaut/blob/master/CHANGELOG.md)

## Recipes

* [Writing tests](docs/recipes/writing-tests.md)
* [Emulating mobile devices in Chrome](docs/recipes/emulating-mobile-devices-in-chrome.md)

## API Reference

* Interfaces
  * [SeleniumConfig](docs/api-reference/interfaces/selenium-config.md)
  * [SeleniumTestContext](docs/api-reference/interfaces/selenium-test-context.md)

* [test()](docs/api-reference/test.md)

* browser
  * [.defineElement()](docs/api-reference/browser/define-element.md)
  * [.elementCount()](docs/api-reference/browser/element-count.md)
  * [.executeScript()](docs/api-reference/browser/execute-script.md)
  * [.loadPage()](docs/api-reference/browser/load-page.md)
  * [.navigateBack()](docs/api-reference/browser/navigate-back.md)
  * [.navigateForward()](docs/api-reference/browser/navigate-forward.md)
  * [.pageTitle](docs/api-reference/browser/page-title.md)
  * [.pageUrl](docs/api-reference/browser/page-url.md)
  * [.reloadPage()](docs/api-reference/browser/reload-page.md)
  * [.scriptResult()](docs/api-reference/browser/script-result.md)
  * [.setWindowPosition()](docs/api-reference/browser/set-window-position.md)
  * [.setWindowSize()](docs/api-reference/browser/set-window-size.md)
  * [.windowHeight](docs/api-reference/browser/window-height.md)
  * [.windowWidth](docs/api-reference/browser/window-width.md)
  * [.windowXPosition](docs/api-reference/browser/window-x-position.md)
  * [.windowYPosition](docs/api-reference/browser/window-y-position.md)

* element
  * [.attributeValue()](docs/api-reference/element/attribute-value.md)
  * [.clearValue()](docs/api-reference/element/clear-value.md)
  * [.click()](docs/api-reference/element/click.md)
  * [.cssValue()](docs/api-reference/element/css-value.md)
  * [.defineDescendantElement()](docs/api-reference/element/define-descendant-element.md)
  * [.descendantElementCount()](docs/api-reference/element/descendant-element-count.md)
  * [.existence](docs/api-reference/element/existence.md)
  * [.height](docs/api-reference/element/height.md)
  * [.sendKeys()](docs/api-reference/element/send-keys.md)
  * [.tagName](docs/api-reference/element/tag-name.md)
  * [.text](docs/api-reference/element/text.md)
  * [.visibility](docs/api-reference/element/visibility.md)
  * [.width](docs/api-reference/element/width.md)
  * [.xPosition](docs/api-reference/element/x-position.md)
  * [.yPosition](docs/api-reference/element/y-position.md)

* it
  * [.should[.not].beBetween()](docs/api-reference/it/should-be-between.md)
  * [.should[.not].beGreaterThanOrEqual()](docs/api-reference/it/should-be-greater-than-or-equal.md)
  * [.should[.not].beGreaterThan()](docs/api-reference/it/should-be-greater-than.md)
  * [.should[.not].beLessThanOrEqual()](docs/api-reference/it/should-be-less-than-or-equal.md)
  * [.should[.not].beLessThan()](docs/api-reference/it/should-be-less-than.md)
  * [.should[.not].contain()](docs/api-reference/it/should-contain.md)
  * [.should[.not].equal()](docs/api-reference/it/should-equal.md)
  * [.should[.not].match()](docs/api-reference/it/should-match.md)

* utils
  * [.isChrome()](docs/api-reference/utils/is-chrome.md)
  * [.isFirefox()](docs/api-reference/utils/is-firefox.md)

## Contributing

* [GitHub Repository](https://github.com/clebert/cybernaut)
* [Development](docs/contributing/development.md)
