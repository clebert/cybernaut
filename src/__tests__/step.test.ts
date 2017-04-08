import proxyquire = require('proxyquire');

import test from 'ava';
import {stub} from 'sinon';
import {resetAll, stepStubs as stubs} from './stubs';

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../step', {'./utils': {sleep: stubs.sleep}});

import {run} from '../step';

test.beforeEach(() => {
  resetAll(stubs);

  stubs.step.onFirstCall().rejects(new Error('foo'));
  stubs.step.onSecondCall().rejects(new Error('bar'));
  stubs.step.onThirdCall().resolves(undefined);
});

test('`run` should return 1', async t => {
  t.plan(3);

  const step = stub().resolves(undefined);

  const attempts = await run(step, 0, 0);

  t.is(attempts, 1);

  t.is(stubs.sleep.callCount, 0);

  t.is(step.callCount, attempts);
});

test('`run` should return 3', async t => {
  t.plan(5);

  const attempts = await run(stubs.step, 2, 50);

  t.is(attempts, 3);

  t.is(stubs.sleep.callCount, 2);
  t.is(stubs.sleep.args[0][0], 50);
  t.is(stubs.sleep.args[1][0], 50);

  t.is(stubs.step.callCount, attempts);
});

test('`run` should throw an error with the message "foo"', async t => {
  t.plan(3);

  await t.throws(run(stubs.step, 0, 50), 'foo');

  t.is(stubs.sleep.callCount, 0);

  t.is(stubs.step.callCount, 1);
});

test('`run` should throw an error with the message "bar"', async t => {
  t.plan(4);

  await t.throws(run(stubs.step, 1, 50), 'bar');

  t.is(stubs.sleep.callCount, 1);
  t.is(stubs.sleep.args[0][0], 50);

  t.is(stubs.step.callCount, 2);
});

test('`run` should await `sleep`', async t => {
  t.plan(4);

  stubs.sleep.rejects(new Error('baz'));

  await t.throws(run(stubs.step, 2, 50), 'baz');

  t.is(stubs.sleep.callCount, 1);
  t.is(stubs.sleep.args[0][0], 50);

  t.is(stubs.step.callCount, 1);
});
