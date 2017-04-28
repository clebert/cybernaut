// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {Accessor} from '../accessor';
import {Action} from '../action';
import {Predicate} from '../predicate';
import {Step} from '../step';
import {resetAll, testStubs as stubs} from './stubs';

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../test', {
  './description': {format: stubs.format}, './step': {run: stubs.run}
});

import {Test} from '../test';

const driver: any = {};

class CustomTest extends Test {
  public constructor() {
    super(driver, 10, 500);

    this.fail = stubs.fail;
    this.pass = stubs.pass;
  }

  public fail(message: string): void {
    return;
  }

  public pass(message: string): void {
    return;
  }
}

const accessor: Accessor<string> = {
  description: {template: 'accessor'}, get: stubs.get
};

const action: Action = {
  description: {template: 'action'}, perform: stubs.perform
};

const predicate: Predicate<string> = {
  description: {template: 'predicate'}, test: stubs.test
};

test.beforeEach(() => {
  resetAll(stubs);
});

test('`Test.assert` should call `Test.pass`', async t => {
  t.plan(6);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.resolves(2);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.format.callCount, 2);
  t.is(stubs.format.args[0][0], accessor.description);
  t.is(stubs.format.args[1][0], predicate.description);

  t.is(stubs.pass.callCount, 1);

  t.is(
    stubs.pass.args[0][0],
    'Assert: accessor predicate (succeeded at attempt 2 of 11)'
  );

  t.is(stubs.fail.callCount, 0);
});

test('`Test.assert` should call `Test.fail`', async t => {
  t.plan(6);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.rejects(new Error('message'));

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.format.callCount, 2);
  t.is(stubs.format.args[0][0], accessor.description);
  t.is(stubs.format.args[1][0], predicate.description);

  t.is(stubs.pass.callCount, 0);

  t.is(stubs.fail.callCount, 1);

  t.is(
    stubs.fail.args[0][0], 'Assert: accessor predicate (failed because message)'
  );
});

test('`Test.assert` should pass default values to `run`', async t => {
  t.plan(3);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 10);
  t.is(stubs.run.args[0][2], 500);
});

test('`Test.assert` should pass individual values to `run`', async t => {
  t.plan(3);

  await new CustomTest().assert(accessor, predicate, 20, 1000);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 20);
  t.is(stubs.run.args[0][2], 1000);
});

test('`Test.assert` should pass a returning step to `run`', async t => {
  t.plan(5);

  stubs.get.returns('value');
  stubs.test.returns(true);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await step();

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});

test('`Test.assert` should pass a throwing step to `run`', async t => {
  t.plan(8);

  stubs.format.onThirdCall().returns('error');
  stubs.get.returns('value');
  stubs.test.returns(false);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await t.throws(step(), 'error');

  t.is(stubs.format.callCount, 3);

  t.deepEqual(stubs.format.args[2][0], {
    template: 'the predicate evaluates to false, the actual value is {}',
    args: ['value']
  });

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});

test('`Test.perform` should call `Test.pass`', async t => {
  t.plan(5);

  stubs.format.onFirstCall().returns('action');

  stubs.run.resolves(2);

  await new CustomTest().perform(action);

  t.is(stubs.format.callCount, 1);
  t.is(stubs.format.args[0][0], action.description);

  t.is(stubs.pass.callCount, 1);
  t.is(stubs.pass.args[0][0], 'Perform: action (succeeded at attempt 2 of 11)');

  t.is(stubs.fail.callCount, 0);
});

test('`Test.perform` should call `Test.fail`', async t => {
  t.plan(5);

  stubs.format.onFirstCall().returns('action');

  stubs.run.rejects(new Error('message'));

  await new CustomTest().perform(action);

  t.is(stubs.format.callCount, 1);
  t.is(stubs.format.args[0][0], action.description);

  t.is(stubs.pass.callCount, 0);

  t.is(stubs.fail.callCount, 1);
  t.is(stubs.fail.args[0][0], 'Perform: action (failed because message)');
});

test('`Test.perform` should pass default values to `run`', async t => {
  t.plan(3);

  await new CustomTest().perform(action);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 10);
  t.is(stubs.run.args[0][2], 500);
});

test('`Test.perform` should pass individual values to `run`', async t => {
  t.plan(3);

  await new CustomTest().perform(action, 20, 1000);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 20);
  t.is(stubs.run.args[0][2], 1000);
});

test('`Test.perform` should pass a returning step to `run`', async t => {
  t.plan(3);

  await new CustomTest().perform(action);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await step();

  t.is(stubs.perform.callCount, 1);
  t.is(stubs.perform.args[0][0], driver);
});

test('`Test.perform` should pass a throwing step to `run`', async t => {
  t.plan(4);

  stubs.perform.throws(new Error('message'));

  await new CustomTest().perform(action);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await t.throws(step(), 'message');

  t.is(stubs.perform.callCount, 1);
  t.is(stubs.perform.args[0][0], driver);
});

test('`Test.verify` should return true', async t => {
  t.plan(4);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.resolves(2);

  t.true(await new CustomTest().verify(accessor, predicate));

  t.is(stubs.pass.callCount, 1);

  t.is(
    stubs.pass.args[0][0],
    'Verify: accessor predicate (succeeded at attempt 2 of 11)'
  );

  t.is(stubs.fail.callCount, 0);
});

test('`Test.verify` should return false', async t => {
  t.plan(4);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.rejects(new Error('message'));

  t.false(await new CustomTest().verify(accessor, predicate));

  t.is(stubs.pass.callCount, 1);

  t.is(
    stubs.pass.args[0][0], 'Verify: accessor predicate (failed because message)'
  );

  t.is(stubs.fail.callCount, 0);
});

test('`Test.verify` should pass default values to `run`', async t => {
  t.plan(3);

  await new CustomTest().verify(accessor, predicate);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 10);
  t.is(stubs.run.args[0][2], 500);
});

test('`Test.verify` should pass individual values to `run`', async t => {
  t.plan(3);

  await new CustomTest().verify(accessor, predicate, 20, 1000);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], 20);
  t.is(stubs.run.args[0][2], 1000);
});

test('`Test.verify` should pass a returning step to `run`', async t => {
  t.plan(5);

  stubs.get.returns('value');
  stubs.test.returns(true);

  await new CustomTest().verify(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await step();

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});

test('`Test.verify` should pass a throwing step to `run`', async t => {
  t.plan(6);

  stubs.get.returns('value');
  stubs.test.returns(false);

  await new CustomTest().verify(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await t.throws(step());

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});
