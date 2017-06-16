import {browser, it, test, utils} from 'cybernaut';
import {rejects} from './assert';

const getCount: browser.AccessorScript<number | null> = callback => {
  setTimeout(() => {
    const counter = document.querySelector('#counter');

    callback(counter && parseInt(counter.innerHTML, 10));
  }, 100);
};

const setCountTo10: browser.ActionScript = callback => {
  setTimeout(() => {
    const counter = document.querySelector('#counter');

    if (counter) {
      counter.innerHTML = '10';
    }

    callback();
  }, 100);
};

const counterUrl = 'file:///opt/static/counter.html';
const todoListUrl = 'file:///opt/static/todo-list.html';

test('Test: browser.elementCount()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(browser.elementCount('span'), it.should.equal(3));
});

test('Test: browser.executeScript()', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(0)
  );

  await t.perform(browser.executeScript('set-count-to-10', setCountTo10));

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(10)
  );
});

test('Test: browser.loadPage()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(browser.pageTitle, it.should.equal('todo-list'));
  await t.assert(browser.pageUrl, it.should.equal(todoListUrl));
});

test('Test: browser.navigateBack()', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(browser.pageTitle, it.should.equal('counter'));
  await t.assert(browser.pageUrl, it.should.equal(counterUrl));

  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(browser.pageTitle, it.should.equal('todo-list'));
  await t.assert(browser.pageUrl, it.should.equal(todoListUrl));

  await t.perform(browser.navigateBack());

  await t.assert(browser.pageTitle, it.should.equal('counter'));
  await t.assert(browser.pageUrl, it.should.equal(counterUrl));
});

test('Test: browser.navigateForward()', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(browser.pageTitle, it.should.equal('counter'));
  await t.assert(browser.pageUrl, it.should.equal(counterUrl));

  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(browser.pageTitle, it.should.equal('todo-list'));
  await t.assert(browser.pageUrl, it.should.equal(todoListUrl));

  await t.perform(browser.navigateBack());

  await t.assert(browser.pageTitle, it.should.equal('counter'));
  await t.assert(browser.pageUrl, it.should.equal(counterUrl));

  await t.perform(browser.navigateForward());

  await t.assert(browser.pageTitle, it.should.equal('todo-list'));
  await t.assert(browser.pageUrl, it.should.equal(todoListUrl));
});

test('Test: browser.pageTitle', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(browser.pageTitle, it.should.equal('counter'));
});

test('Test: browser.pageUrl', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(browser.pageUrl, it.should.equal(counterUrl));
});

test('Test: browser.reloadPage()', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(0)
  );

  await t.perform(browser.executeScript('set-count-to-10', setCountTo10));

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(10)
  );

  await t.perform(browser.reloadPage());

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(0)
  );
});

test('Test: browser.scriptResult()', async t => {
  await t.perform(browser.loadPage(counterUrl));

  await t.assert(
    browser.scriptResult('get-count', getCount),
    it.should.equal(0)
  );
});

test('Test: browser.setWindowPosition()', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowXPosition, it.should.equal(10));
    await t.assert(browser.windowYPosition, it.should.equal(10));

    await t.perform(browser.setWindowPosition(5, 15));

    await t.assert(browser.windowXPosition, it.should.equal(5));
    await t.assert(browser.windowYPosition, it.should.equal(15));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.perform(browser.setWindowPosition(5, 15), {retries: 0}),
      /setWindowRect/
    );
  }
});

test('Test: browser.setWindowSize()', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowWidth, it.should.equal(1050));
    await t.assert(browser.windowHeight, it.should.equal(700));

    await t.perform(browser.setWindowSize(640, 480));

    await t.assert(browser.windowWidth, it.should.equal(640));
    await t.assert(browser.windowHeight, it.should.equal(480));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.perform(browser.setWindowSize(640, 480), {retries: 0}),
      /setWindowRect/
    );
  }
});

test('Test: browser.windowHeight', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowHeight, it.should.equal(700));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.assert(browser.windowHeight, it.should.equal(700), {retries: 0}),
      /getWindowRect/
    );
  }
});

test('Test: browser.windowWidth', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowWidth, it.should.equal(1050));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.assert(browser.windowWidth, it.should.equal(1050), {retries: 0}),
      /getWindowRect/
    );
  }
});

test('Test: browser.windowXPosition', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowXPosition, it.should.equal(10));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.assert(browser.windowXPosition, it.should.equal(10), {retries: 0}),
      /getWindowRect/
    );
  }
});

test('Test: browser.windowYPosition', async (t, config) => {
  await t.perform(browser.loadPage(counterUrl));

  if (utils.isChrome(config)) {
    await t.assert(browser.windowYPosition, it.should.equal(10));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.assert(browser.windowYPosition, it.should.equal(10), {retries: 0}),
      /getWindowRect/
    );
  }
});
