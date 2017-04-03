import proxyquire = require('proxyquire');

import test from 'ava';
import {Stub, stub} from 'sinon';
import {Deferred} from './deferred';

const sleep = stub();

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../step', {'./utils': {sleep}});

import {run} from '../step';

let deferred: Deferred;
let step: Stub;

test.beforeEach(t => {
  sleep.reset();
  sleep.resetBehavior();

  deferred = new Deferred();

  sleep.resolves(deferred);

  step = stub();

  step.onFirstCall().rejects(new Error('foo'));
  step.onSecondCall().rejects(new Error('bar'));
  step.onThirdCall().resolves(undefined);
});

test('\`run\` should return 1', async t => {
  t.plan(4);

  step = stub().resolves(undefined);

  const attempts = await run(step, 0, 0);

  t.is(attempts, 1);

  t.false(deferred.done);

  t.is(sleep.callCount, 0);

  t.is(step.callCount, attempts);
});

test('\`run\` should return 3', async t => {
  t.plan(6);

  const attempts = await run(step, 2, 50);

  t.is(attempts, 3);

  t.true(deferred.done);

  t.is(sleep.callCount, 2);
  t.is(sleep.args[0][0], 50);
  t.is(sleep.args[1][0], 50);

  t.is(step.callCount, attempts);
});

test('\`run\` should throw an error with the message "foo"', async t => {
  t.plan(4);

  await t.throws(run(step, 0, 50), 'foo');

  t.false(deferred.done);

  t.is(sleep.callCount, 0);

  t.is(step.callCount, 1);
});

test('\`run\` should throw an error with the message "bar"', async t => {
  t.plan(5);

  await t.throws(run(step, 1, 50), 'bar');

  t.true(deferred.done);

  t.is(sleep.callCount, 1);
  t.is(sleep.args[0][0], 50);

  t.is(step.callCount, 2);
});
