# Cybernaut Example

![Example][example-png]

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

The above example can be executed in a [Docker][docker] container,

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

The captured screenshot can be found in the following directory: `./example/screenshots/`

[docker]: https://www.docker.com/
[emulating-mobile-devices-in-chrome]: https://github.com/clebert/cybernaut#emulating-mobile-devices-in-chrome
[example-png]: https://clebert.github.io/cybernaut/example.png
