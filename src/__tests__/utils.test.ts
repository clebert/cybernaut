import test from 'ava';
import {Stub, stub} from 'sinon';
import {sleep} from '../utils';

let originalSetTimeout: typeof global.setTimeout;
let setTimeoutStub: Stub;

test.beforeEach(() => {
  originalSetTimeout = global.setTimeout;
  global.setTimeout = setTimeoutStub = stub();
});

test.afterEach(() => {
  global.setTimeout = originalSetTimeout;
});

test('`sleep` should return a promise that resolves after 50 ms', async t => {
  t.plan(4);

  let resolved = false;

  const promise = sleep(50).then(() => resolved = true);

  t.is(setTimeoutStub.callCount, 1);
  t.is(setTimeoutStub.args[0][1], 50);

  await new Promise<void>(resolve => {
    setImmediate(resolve);
  });

  t.false(resolved);

  setTimeoutStub.args[0][0]();

  await promise;

  t.true(resolved);
});
