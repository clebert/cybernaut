// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {implementationStubs as stubs, resetAll} from './stubs';

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../implementation', {
  'selenium-webdriver': {Builder: stubs.Builder}, './test': {Test: stubs.Test}
});

import {Options, execute} from '../implementation';

let driver: any;
let options: Options;
let tap: any;

test.beforeEach(() => {
  resetAll(stubs);

  stubs.Builder.returns({withCapabilities: stubs.withCapabilities});
  stubs.withCapabilities.returns({build: stubs.build});
  stubs.build.returns(driver = {manage: stubs.manage, quit: stubs.quit});
  stubs.manage.returns({timeouts: stubs.timeouts});

  stubs.timeouts.returns({
    implicitlyWait: stubs.implicitlyWait,
    pageLoadTimeout: stubs.pageLoadTimeout,
    setScriptTimeout: stubs.setScriptTimeout
  });

  options = {
    capabilities: {browserName: 'chrome'},
    retries: 100,
    retryDelay: 200,
    timeouts: {element: 300, page: 400, script: 500}
  };

  tap = {pass: stubs.pass};
});

test('`execute` should create a WebDriver and set its timeouts', async t => {
  t.plan(15);

  await t.notThrows(execute(stubs.implementation, tap, options));

  t.is(stubs.Builder.callCount, 1);
  t.true(stubs.Builder.calledWithNew());

  t.is(stubs.withCapabilities.callCount, 1);
  t.deepEqual(stubs.withCapabilities.args[0][0], {browserName: 'chrome'});

  t.is(stubs.build.callCount, 1);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], 300);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], 400);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], 500);

  t.is(stubs.manage.callCount, 3);
  t.is(stubs.timeouts.callCount, 3);

  t.is(stubs.quit.callCount, 1);
});

test('`execute` should create a Test and call `implementation`', async t => {
  t.plan(9);

  await t.notThrows(execute(stubs.implementation, tap, options));

  t.is(stubs.implementation.callCount, 1);

  t.is(stubs.Test.callCount, 1);
  t.is(stubs.Test.args[0][0], driver);
  t.is(stubs.Test.args[0][1], 100);
  t.is(stubs.Test.args[0][2], 200);

  const test = stubs.implementation.args[0][0];

  t.throws(() => test.fail('foo', new Error('bar')), 'foo (cause: bar)');

  test.pass('baz');

  t.is(stubs.pass.callCount, 1);
  t.is(stubs.pass.args[0][0], 'baz');
});

test('`execute` should await `implicitlyWait`', async t => {
  t.plan(4);

  stubs.implicitlyWait.rejects(new Error('foo'));

  await t.throws(execute(stubs.implementation, tap, options), 'foo');

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implementation.callCount, 0);
  t.is(stubs.quit.callCount, 1);
});

test('`execute` should await `pageLoadTimeout`', async t => {
  t.plan(4);

  stubs.pageLoadTimeout.rejects(new Error('foo'));

  await t.throws(execute(stubs.implementation, tap, options), 'foo');

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.implementation.callCount, 0);
  t.is(stubs.quit.callCount, 1);
});

test('`execute` should await `setScriptTimeout`', async t => {
  t.plan(4);

  stubs.setScriptTimeout.rejects(new Error('foo'));

  await t.throws(execute(stubs.implementation, tap, options), 'foo');

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.implementation.callCount, 0);
  t.is(stubs.quit.callCount, 1);
});

test('`execute` should await `implementation`', async t => {
  t.plan(3);

  stubs.implementation.rejects(new Error('foo'));

  await t.throws(execute(stubs.implementation, tap, options), 'foo');

  t.is(stubs.implementation.callCount, 1);
  t.is(stubs.quit.callCount, 1);
});
