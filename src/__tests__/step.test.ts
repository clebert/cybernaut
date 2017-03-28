import test from 'ava';
import {Stub, stub} from 'sinon';
import {run} from '../step';

let step: Stub;

test.beforeEach(t => {
  step = stub();

  step.onFirstCall().rejects(new Error('foo'));
  step.onSecondCall().rejects(new Error('bar'));
  step.onThirdCall().resolves(undefined);
});

test('\`run\` should return 1', async t => {
  t.plan(2);

  step = stub().resolves(undefined);

  const attempts = await run(step, 0, 0);

  t.is(attempts, 1);
  t.is(step.callCount, attempts);
});

test('\`run\` should return 3', async t => {
  t.plan(2);

  const attempts = await run(step, 2, 0);

  t.is(attempts, 3);
  t.is(step.callCount, attempts);
});

test('\`run\` should throw an error with the message "foo"', async t => {
  t.plan(2);

  await t.throws(run(step, 0, 0), 'foo');

  t.is(step.callCount, 1);
});

test('\`run\` should throw an error with the message "bar"', async t => {
  t.plan(2);

  await t.throws(run(step, 1, 0), 'bar');

  t.is(step.callCount, 2);
});

test('\`run\` should have a runtime between 100 ms and 150 ms', async t => {
  t.plan(2);

  const startTime = Date.now();

  await run(step, 2, 50);

  const endTime = Date.now();

  t.true(endTime - startTime > 100);
  t.true(endTime - startTime < 150);
});

test('\`run\` should have a runtime between 150 ms and 225 ms', async t => {
  t.plan(2);

  const startTime = Date.now();

  await run(step, 2, 75);

  const endTime = Date.now();

  t.true(endTime - startTime > 150);
  t.true(endTime - startTime < 225);
});
