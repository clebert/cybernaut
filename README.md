# ![Cybernaut][logo-svg]

[![npm][npm-badge]][npm]
[![build][travis-ci-badge]][travis-ci]
[![coverage][coveralls-badge]][coveralls]
[![semantic-release][semantic-release-badge]][semantic-release]
[![Greenkeeper][greenkeeper-badge]][greenkeeper]
[![TypeScript][typescript-badge]][typescript]

> Reliable, zero configuration end-to-end testing in BDD-style.

[![Example][example-png]][example]

[WYSIWYM][WYSIWYM]—the above **human-readable** test output corresponds to what is programmed:

```js
const {browser, defineElement, it, test} = require('cybernaut');

test('Star the "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert/cybernaut'));

  await t.perform(browser.takeScreenshot());

  const switchToDesktopButton = defineElement(
    'button.switch-to-desktop', 'switch-to-desktop button'
  );

  // When on the mobile version, then switch to the desktop version
  if (await t.verify(switchToDesktopButton.visibility, it.should.equal(true))) {
    await t.perform(switchToDesktopButton.click());
  }

  const starButton = defineElement(
    'ul.pagehead-actions > li:nth-child(2)', 'star button'
  );

  // The star button leads to a login form, so the project is not really starred
  await t.perform(starButton.click());
});
```

This [example][example] can be easily executed in a [Docker][docker] container,

on Chrome:

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh chrome && ./scripts/docker/run-example.sh chrome
```

on Firefox:

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh firefox && ./scripts/docker/run-example.sh firefox
```

on [iPhone 6 Plus][emulating-mobile-devices-in-chrome]:

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh iphone && ./scripts/docker/run-example.sh iphone
```

The captured screenshots can be found in the `./example/screenshots/` directory.

## Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Starting Cybernaut](#starting-cybernaut)
  * [Configuring Cybernaut](#configuring-cybernaut)
  * [Testing with Docker](#testing-with-docker)
  * [Emulating mobile devices in Chrome](#emulating-mobile-devices-in-chrome)
  * [Writing end-to-end tests](#writing-end-to-end-tests)
* [API](#api)
* [Related links](#related-links)
* [Development](#development)

## [Installation](#contents)

```sh
npm install --save-dev cybernaut
```

*Note: It is recommended to [run your end-to-end tests with Docker](#testing-with-docker).
Otherwise, if the default configuration is used, a current version of Chrome must be installed.
Cybernaut is tested with Chrome and Firefox and **provides** the latest drivers for these two.*

## [Usage](#contents)

### [Starting Cybernaut](#usage)

Cybernaut must be started from the command line:

```sh
$(npm bin)/cybernaut
```

Directories are recursed, with all `**/*.e2e.js` files being treated as test files.

Cybernaut produces output in [TAP][tap] format, [`tap-mocha-reporter`][tap-mocha-reporter] can be used to format it:

```sh
npm install --save-dev tap-mocha-reporter
```

```sh
$(npm bin)/cybernaut | $(npm bin)/tap-mocha-reporter spec
```

To enable debug output, you can set the `DEBUG=cybernaut:*` environment variable:

```sh
DEBUG=cybernaut:* $(npm bin)/cybernaut
```

### [Configuring Cybernaut](#usage)

The following configuration is active by default:

```json
{
  "capabilities": {"browserName": "chrome"},
  "concurrency": 1,
  "exclude": ["**/node_modules/**/*"],
  "include": "**/*.e2e.js",
  "retries": 4,
  "retryDelay": 500,
  "screenshotDirectory": "screenshots",
  "timeouts": {"element": 0, "page": 30000, "script": 30000}
}
```

Configuration options:

* `capabilities`: Specifies the desired [WebDriver capabilities][selenium-desired-capabilities].
* `capabilities.browserName`: Specifies the browser to use. For example: `"chrome"` or `"firefox"`
* `concurrency`: Specifies the maximum number of end-to-end tests running at the same time.
* `exclude`: Specifies the [glob patterns][node-glob], for which matching files will be removed from the set of test files.
* `include`: Specifies the [glob pattern][node-glob], for which matching files will be added to the set of test files.
* `retries`: Specifies the maximum number of retries of failed [test steps](#assert).
* `retryDelay`: Specifies the time, in milliseconds, to wait between retries of failed [test steps](#assert).
* `screenshotDirectory`: Specifies the relative or absolute path to the screenshot directory.
* `timeouts.element`: Specifies the maximum time, in milliseconds, to wait when searching for an element, that is not immediately present, before returning an error.
* `timeouts.page`: Specifies the maximum time, in milliseconds, to wait for a page load to complete before returning an error.
* `timeouts.script`: Specifies the maximum time, in milliseconds, for an asynchronous script to finish execution before returning an error.

A separate configuration can be passed as a command line argument:

```sh
$(npm bin)/cybernaut config.json
```

Such a configuration can be validated with [this JSON schema][config-schema] and written as a

JSON file:

```json
{
  "capabilities": {"browserName": "firefox"}
}
```

or JavaScript module:

```js
module.exports = {
  capabilities: {browserName: 'firefox'}
};
```

### [Testing with Docker](#usage)

End-to-end tests written with Cybernaut can be run in a Docker container.
This has the advantage of being able to run them independently of the environment and under reproducible conditions.

*Note: The provided [examples][example] can serve as a reference implementation.*

Cybernaut brings two fully configured Docker containers, which can be found on [Docker Hub][docker-hub-clebert].
One allows testing on Chrome:

```dockerfile
FROM clebert/cybernaut-chrome:3.2.1
```

 the other on Firefox:

```dockerfile
FROM clebert/cybernaut-firefox:3.2.1
```

You can find a list of available tags for `cybernaut-chrome` [here][docker-hub-chrome-tags] and for `cybernaut-firefox` [here][docker-hub-firefox-tags].
Each Docker tag corresponds to the same tag/version of `cybernaut` on [npm][npm].

The test files must be copied into the `/opt/e2e-test/` directory inside the Docker container:

```dockerfile
COPY example.e2e.js /opt/e2e-test/example.e2e.js
```

The default configuration can be overridden with the following Docker instruction:

```dockerfile
COPY config.json /opt/config.json
```

Chrome default configuration:

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "args": [
        "--disable-gpu",
        "--no-sandbox"
      ]
    }
  }
}
```

Firefox default configuration:

```json
{
  "capabilities": {
    "browserName": "firefox"
  }
}
```

In addition, a default `CMD` instruction is configured to specify the virtual screen resolution and the [reporter][tap-reporters]:

```dockerfile
CMD ["1280x720", "spec"]
```

*Note: [`tap-mocha-reporter`][tap-mocha-reporter] is used to format the TAP output.
[Here][tap-reporters] is a list of all available reporters.*

You can override it with your own `CMD` instruction or with CLI arguments for `docker run`:

```sh
docker run -it --rm -v /dev/shm:/dev/shm clebert/cybernaut-chrome-example 1920x1080 dot
```

In order to get access to the captured screenshots, a local screenshots directory can be [mounted][docker-mount] into the `/opt/e2e-test/` directory inside the Docker container:

```sh
docker run -it --rm -v $(cd example/screenshots; pwd):/opt/e2e-test/screenshots -v /dev/shm:/dev/shm clebert/cybernaut-chrome-example
```

To enable debug output, you can set the `DEBUG=cybernaut:*` environment variable:

```sh
docker run -it --rm -v /dev/shm:/dev/shm -e DEBUG=cybernaut:* clebert/cybernaut-chrome-example
```

*Note: When executing docker run for an image with chrome browser please add `-v /dev/shm:/dev/shm` [volume mount][docker-mount] to use the host's shared memory.
Since a Docker container is not meant to preserve state and spawning a new one takes less than 3 seconds you will likely want to remove containers after each end-to-end test with `--rm` command.*

### [Emulating mobile devices in Chrome](#usage)

The provided [ChromeDriver][chromedriver] allows developers to emulate Chrome on a mobile device, by enabling the [Mobile Emulation][mobile-emulation] feature via the `mobileEmulation` capability. This feature speeds up web development, allows developers to quickly test how a website will render on a mobile device, without requiring a real device.

There are two ways in [ChromeDriver][chromedriver] to enable [Mobile Emulation][mobile-emulation]: by specifying a known device, or by specifying individual device attributes. The format of the `mobileEmulation` dictionary depends on which method is desired.

#### Specifying a known mobile device

To enable [Mobile Emulation][mobile-emulation] with a specific device name, the `mobileEmulation` dictionary must contain a `deviceName`. Use a valid device name from the DevTools Emulation panel as the value for `deviceName`:

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "mobileEmulation": {
        "deviceName": "Apple iPhone 6 Plus"
      }
    }
  }
}
```

#### Specifying individual device attributes

It is also possible to enable [Mobile Emulation][mobile-emulation] by specifying individual attributes. To enable [Mobile Emulation][mobile-emulation] this way, the `mobileEmulation` dictionary can contain a `deviceMetrics` dictionary and a `userAgent` string. The following device metrics must be specified in the `deviceMetrics` dictionary:

* `width` - the width in pixels of the device's screen
* `height` - the height in pixels of the device's screen
* `pixelRatio` - the device's pixel ratio
* `touch` - whether to emulate touch events (defaults to true, usually does not need to be set)

```json
{
  "capabilities": {
    "browserName": "chrome",
    "chromeOptions": {
      "mobileEmulation": {
        "deviceMetrics": {
          "width": 360,
          "height": 640,
          "pixelRatio": 3.0
        },
        "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
      }
    }
  }
}
```

### [Writing end-to-end tests](#usage)

It is recommended to write end-to-end tests using [async functions][mdn-async], which are natively supported by [Node.js][nodejs] as of version 7. Alternatively, the test files must be compiled using [TypeScript][typescript] or [Babel][babel].

If you write your end-to-end tests with [TypeScript][typescript], it is recommended to enable the [`no-floating-promises`][tslint-rule-no-floating-promises] [TSLint][tslint] rule. This can prevent the [`await`][mdn-await] operators from being forgotten.

## [API](#contents)

* [Module `exports`](#module-exports)
  * [`test`](#test)
  * [`skip`](#skip)
  * [`browser`](#browser)
  * [`defineElement`](#defineelement)
  * [`it`](#it)
* [Interface `Test`](#interface-test)
  * [`assert`](#assert)
  * [`perform`](#perform)
  * [`verify`](#verify)
  * [`fail`](#fail)
  * [`pass`](#pass)
* [Interface `Browser`](#interface-browser)
  * [`pageTitle`](#pagetitle)
  * [`pageUrl`](#pageurl)
  * [`windowX`](#windowx)
  * [`windowY`](#windowy)
  * [`windowWidth`](#windowwidth)
  * [`windowHeight`](#windowheight)
  * [`scriptResult`](#scriptresult)
  * [`executeScript`](#executescript)
  * [`loadPage`](#loadpage)
  * [`maximizeWindow`](#maximizewindow)
  * [`navigateBack`](#navigateback)
  * [`navigateForward`](#navigateforward)
  * [`reloadPage`](#reloadpage)
  * [`setWindowPosition`](#setwindowposition)
  * [`setWindowSize`](#setwindowsize)
  * [`sleep`](#sleep)
  * [`takeScreenshot`](#takescreenshot)
* [Interface `Element`](#interface-element)
  * [`tagName`](#tagname)
  * [`text`](#text)
  * [`visibility`](#visibility)
  * [`x`](#x)
  * [`y`](#y)
  * [`width`](#width)
  * [`height`](#height)
  * [`cssValue`](#cssvalue)
  * [`propertyValue`](#propertyvalue)
  * [`clearValue`](#clearvalue)
  * [`click`](#click)
  * [`sendKeys`](#sendkeys)
  * [`submitForm`](#submitform)
* [Interface `PredicateBuilder`](#interface-predicatebuilder)
  * [`contain`](#contain)
  * [`not.contain`](#notcontain)
  * [`equal`](#equal)
  * [`not.equal`](#notequal)
  * [`match`](#match)
  * [`not.match`](#notmatch)
  * [`be.above`](#beabove)
  * [`be.at.least`](#beatleast)
  * [`be.below`](#bebelow)
  * [`be.at.most`](#beatmost)

### [Module `exports`](#api)

#### [`test`](#api)

Type definition:

* **`test(name: string, implementation?: Implementation): void`**
* `Implementation = (t: Test) => Promise<void>`
* [`Test`](#interface-test)

Example usage:

```js
const {test} = require('cybernaut');

test('foo'); // This end-to-end test will be marked as TODO

test('foo', async t => { // This end-to-end test will be executed
  // ...
});
```

#### [`skip`](#api)

Type definition:

* **`skip(name: string, implementation: Implementation): void`**
* `Implementation = (t: Test) => Promise<void>`
* [`Test`](#interface-test)

Example usage:

```js
const {skip} = require('cybernaut');

skip('foo', async t => { // This end-to-end test won't be executed (and marked as SKIP)
  // ...
});
```

#### [`browser`](#api)

Type definition:

* **`browser: Browser`**
* [`Browser`](#interface-browser)

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz'));
});
```

#### [`defineElement`](#api)

Type definition:

* **`defineElement(selector: string, name: string = 'element'): Element`**
* [`Element`](#interface-element)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.click());
});
```

#### [`it`](#api)

Type definition:

* **`it: {should: PredicateBuilder}`**
* [`PredicateBuilder`](#interface-predicatebuilder)

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

### [Interface `Test`](#api)

#### [`assert`](#api)

Type definition:

* **`assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar')); // Throws an error if the condition isn't met
});
```

*Note: An assertion is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

#### [`perform`](#api)

Type definition:

* **`perform(action: Action, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz')); // Throws an error if the action fails
});
```

*Note: A performance is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

#### [`verify`](#api)

Type definition:

* **`verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<boolean>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  if (await t.verify(browser.pageTitle, it.should.contain('bar'))) { // Evaluates to false if the condition isn't met
    // ...
  }
});
```

*Note: A verification is a single test step for which the globally configured `retries` and `retryDelay` options can be overwritten.*

#### [`fail`](#api)

Type definition:

* **`fail(message: string, cause: Error): void`**

Example [TAP][tap] output: `not ok 1 - bar (cause: baz)`

Example usage:

```js
const {test} = require('cybernaut');

test('foo', async t => {
  t.fail('bar', new Error('baz')); // Throws a new error
});
```

#### [`pass`](#api)

Type definition:

* **`pass(message: string): void`**

Example [TAP][tap] output: `ok 1 - bar`

Example usage:

```js
const {test} = require('cybernaut');

test('foo', async t => {
  t.pass('bar'); // Prints a successful-test line in TAP format on standard output
});
```

### [Interface `Browser`](#api)

#### [`pageTitle`](#api)

Type definition:

* **`pageTitle: Accessor<string>`**

Example [TAP][tap] output: `ok 1 - page title should contain 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

#### [`pageUrl`](#api)

Type definition:

* **`pageUrl: Accessor<string>`**

Example [TAP][tap] output: `ok 1 - page url should contain 'http://bar.baz' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageUrl, it.should.contain('http://bar.baz'));
});
```

#### [`windowX`](#api)

Type definition:

* **`windowX: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - window x-position should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowX, it.should.equal(123));
});
```

#### [`windowY`](#api)

Type definition:

* **`windowY: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - window y-position should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowY, it.should.equal(123));
});
```

#### [`windowWidth`](#api)

Type definition:

* **`windowWidth: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - window width should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.equal(123));
});
```

#### [`windowHeight`](#api)

Type definition:

* **`windowHeight: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - window height should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowHeight, it.should.equal(123));
});
```

#### [`scriptResult`](#api)

Type definition:

* **`scriptResult(scriptName: string, script: Script): Accessor<any>`**
* `Script = (callback: (result?: any) => void) => void`

Example [TAP][tap] output: `ok 1 - result of script 'bar' should equal 'baz' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.scriptResult('bar', callback => {
    // This function will be executed in browser context, so any references to outer scope won't work
    // ...

    callback('baz');
  }), it.should.equal('baz'));
});
```

#### [`executeScript`](#api)

Type definition:

* **`executeScript(scriptName: string, script: Script): Action`**
* `Script = (callback: (result?: any) => void) => void`

Example [TAP][tap] output: `ok 1 - execute script 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.executeScript('bar', callback => {
    // This function will be executed in browser context, so any references to outer scope won't work
    // ...

    callback();
  }));
});
```

#### [`loadPage`](#api)

Type definition:

* **`loadPage(url: string): Action`**

Example [TAP][tap] output: `ok 1 - load page 'http://bar.baz' (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz'));
});
```

#### [`maximizeWindow`](#api)

Type definition:

* **`maximizeWindow(): Action`**

Example [TAP][tap] output: `ok 1 - maximize window (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.maximizeWindow());
});
```

#### [`navigateBack`](#api)

Type definition:

* **`navigateBack(): Action`**

Example [TAP][tap] output: `ok 1 - navigate back (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.navigateBack());
});
```

#### [`navigateForward`](#api)

Type definition:

* **`navigateForward(): Action`**

Example [TAP][tap] output: `ok 1 - navigate forward (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.navigateForward());
});
```

#### [`reloadPage`](#api)

Type definition:

* **`reloadPage(): Action`**

Example [TAP][tap] output: `ok 1 - reload page (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.reloadPage());
});
```

#### [`setWindowPosition`](#api)

Type definition:

* **`setWindowPosition(x: number, y: number): Action`**

Example [TAP][tap] output: `ok 1 - set window position to 123,456 (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.setWindowPosition(123, 456));
});
```

#### [`setWindowSize`](#api)

Type definition:

* **`setWindowSize(width: number, height: number): Action`**

Example [TAP][tap] output: `ok 1 - set window size to 123x456 (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.setWindowSize(123, 456));
});
```

#### [`sleep`](#api)

Type definition:

* **`sleep(duration: number): Action`**

Example [TAP][tap] output: `ok 1 - sleep for 123 ms (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.sleep(123));
});
```

#### [`takeScreenshot`](#api)

Type definition:

* **`takeScreenshot(): Action`**

Example [TAP][tap] output: `ok 1 - take screenshot 'screenshots/07cc9369-ab10-4221-9bc9-18ad12b87c7c.png' (attempt 1 of 5)`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.takeScreenshot());
});
```

### [Interface `Element`](#api)

#### [`tagName`](#api)

Type definition:

* **`tagName: Accessor<string>`**

Example [TAP][tap] output: `ok 1 - tag name of element '#bar' should equal 'div' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.tagName, it.should.equal('div'));
});
```

#### [`text`](#api)

Type definition:

* **`text: Accessor<string>`**

Example [TAP][tap] output: `ok 1 - text of element '#bar' should equal 'baz' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.text, it.should.equal('baz'));
});
```

#### [`visibility`](#api)

Type definition:

* **`visibility: Accessor<boolean>`**

Example [TAP][tap] output: `ok 1 - visibility of element '#bar' should equal true (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.visibility, it.should.equal(true));
});
```

#### [`x`](#api)

Type definition:

* **`x: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - x-position of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.x, it.should.equal(123));
});
```

#### [`y`](#api)

Type definition:

* **`y: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - y-position of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.y, it.should.equal(123));
});
```

#### [`width`](#api)

Type definition:

* **`width: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - width of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.width, it.should.equal(123));
});
```

#### [`height`](#api)

Type definition:

* **`height: Accessor<number>`**

Example [TAP][tap] output: `ok 1 - height of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.height, it.should.equal(123));
});
```

#### [`cssValue`](#api)

Type definition:

* **`cssValue(cssName: string): Accessor<string>`**

Example [TAP][tap] output: `ok 1 - css value 'margin-left' of element '#bar' should equal '22px' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.cssValue('margin-left'), it.should.equal('22px'));
});
```

#### [`propertyValue`](#api)

Type definition:

* **`propertyValue(propertyName: string): Accessor<string | null>`**

Example [TAP][tap] output: `ok 1 - property value 'id' of element '#bar' should equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.propertyValue('id'), it.should.equal('bar'));
});
```

#### [`clearValue`](#api)

Type definition:

* **`clearValue(): Action`**

Example [TAP][tap] output: `ok 1 - clear value of element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.clearValue());
});
```

#### [`click`](#api)

Type definition:

* **`click(): Action`**

Example [TAP][tap] output: `ok 1 - click on element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.click());
});
```

#### [`sendKeys`](#api)

Type definition:

* **`sendKeys(...keys: string[]): Action`**

Example [TAP][tap] output: `ok 1 - send keys [ 'text was', 'Key.CONTROL', 'a', 'Key.NULL', 'now text is' ] to element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {Key, defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is'));
});
```

> Modifier keys ([Key.SHIFT][selenium-webdriver-key], [Key.CONTROL][selenium-webdriver-key], [Key.ALT][selenium-webdriver-key], [Key.META][selenium-webdriver-key]) are stateful; once a modifier is processed in the keysequence, that key state is toggled until one of the following occurs:
>
> - The modifier key is encountered again in the sequence. At this point the state of the key is toggled (along with the appropriate keyup/down events).
>
> - The [Key.NULL][selenium-webdriver-key] key is encountered in the sequence. When this key is encountered, all modifier keys current in the down state are released (with accompanying keyup events).
>
> - The end of the keysequence is encountered. When there are no more keys to type, all depressed modifier keys are released (with accompanying keyup events).
>
> — *[selenium-webdriver.WebElement][selenium-webdriver-webelement]*

*Note: The `WebElement` of `selenium-webdriver` is used internally, but is not accessible from the outside.*

#### [`submitForm`](#api)

Type definition:

* **`submitForm(): Action`**

Example [TAP][tap] output: `ok 1 - submit form containing element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.submitForm());
});
```

### [Interface `PredicateBuilder`](#api)

#### [`contain`](#api)

Type definition:

* **`contain(expectedValue: string): Predicate<string>`**

Example [TAP][tap] output: `ok 1 - page title should contain 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

#### [`not.contain`](#api)

Type definition:

* **`not.contain(expectedValue: string): Predicate<string>`**

Example [TAP][tap] output: `ok 1 - page title should not contain 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.contain('bar'));
});
```

#### [`equal`](#api)

Type definition:

* **`equal<T>(expectedValue: T): Predicate<T>`**

Example [TAP][tap] output: `ok 1 - page title should equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.equal('bar'));
});
```

*Note: The comparison is performed with [deep-strict-equal][deep-strict-equal].*

#### [`not.equal`](#api)

Type definition:

* **`not.equal<T>(expectedValue: T): Predicate<T>`**

Example [TAP][tap] output: `ok 1 - page title should not equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.equal('bar'));
});
```

*Note: The comparison is performed with [deep-strict-equal][deep-strict-equal].*

#### [`match`](#api)

Type definition:

* **`match(regex: RegExp): Predicate<string>`**

Example [TAP][tap] output: `ok 1 - page title should match /bar/ (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.match(/bar/));
});
```

#### [`not.match`](#api)

Type definition:

* **`not.match(regex: RegExp): Predicate<string>`**

Example [TAP][tap] output: `ok 1 - page title should not match /bar/ (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.not.match(/bar/));
});
```

#### [`be.above`](#api)

Type definition:

* **`be.above(expectedValue: number): Predicate<number>`**

Example [TAP][tap] output: `ok 1 - window width should be above 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.be.above(123)); // windowWidth > 123
});
```

#### [`be.at.least`](#api)

Type definition:

* **`be.at.least(expectedValue: number): Predicate<number>`**

Example [TAP][tap] output: `ok 1 - window width should be at least 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.be.at.least(123)); // windowWidth >= 123
});
```

#### [`be.below`](#api)

Type definition:

* **`be.below(expectedValue: number): Predicate<number>`**

Example [TAP][tap] output: `ok 1 - window width should be below 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.be.below(123)); // windowWidth < 123
});
```

#### [`be.at.most`](#api)

Type definition:

* **`be.at.most(expectedValue: number): Predicate<number>`**

Example [TAP][tap] output: `ok 1 - window width should be at most 123 (attempt 1 of 5)`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.be.at.most(123)); // windowWidth <= 123
});
```

## [Related links](#contents)

* [Google Testing Blog: Just Say No to More End-to-End Tests][link1]
* [Testing Strategies in a Microservice Architecture][link2]

## [Development](#contents)

### Installing dev dependencies

```sh
npm install
```

*Note: Please also install [Docker][docker].*

### Watching unit tests

```sh
npm run watch
```

### Running unit tests (w/o watching)

```sh
npm test
```

### Running examples with Docker

```sh
npm run examples
```

### Checking for formatting and linting errors

```sh
npm run check
```

### Formatting sources

```sh
npm run format
```

### Committing a new change

```sh
npm run cz
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[babel]: https://babeljs.io/
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver/home
[config-schema]: https://github.com/clebert/cybernaut/blob/master/config-schema.json
[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[deep-strict-equal]: https://github.com/sindresorhus/deep-strict-equal
[docker]: https://www.docker.com/
[docker-hub-chrome-tags]: https://hub.docker.com/r/clebert/cybernaut-chrome/tags/
[docker-hub-clebert]: https://hub.docker.com/r/clebert/
[docker-hub-firefox-tags]: https://hub.docker.com/r/clebert/cybernaut-firefox/tags/
[docker-mount]: https://docs.docker.com/engine/tutorials/dockervolumes/#mount-a-host-directory-as-a-data-volume
[emulating-mobile-devices-in-chrome]: https://github.com/clebert/cybernaut#emulating-mobile-devices-in-chrome
[example]: https://github.com/clebert/cybernaut/tree/master/example
[example-png]: https://clebert.github.io/cybernaut/example.png
[greenkeeper]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/clebert/cybernaut.svg
[link1]: https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html
[link2]: https://www.martinfowler.com/articles/microservice-testing/#testing-end-to-end-tips
[logo-svg]: https://clebert.github.io/cybernaut/logo.svg
[mdn-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[mdn-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[mobile-emulation]: https://sites.google.com/a/chromium.org/chromedriver/mobile-emulation
[node-glob]: https://github.com/isaacs/node-glob
[nodejs]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/package/cybernaut
[npm-badge]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[selenium-desired-capabilities]: https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
[selenium-webdriver-key]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
[selenium-webdriver-webelement]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[tap]: https://testanything.org/
[tap-mocha-reporter]: https://github.com/tapjs/tap-mocha-reporter
[tap-reporters]: https://github.com/tapjs/tap-mocha-reporter/tree/master/lib/reporters
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[tslint]: https://palantir.github.io/tslint/
[tslint-rule-no-floating-promises]: https://palantir.github.io/tslint/rules/no-floating-promises/
[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
[WYSIWYM]: https://en.wikipedia.org/wiki/WYSIWYM
