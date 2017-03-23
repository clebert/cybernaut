// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {stub} from 'sinon';
import {Accessor} from '../accessor';
import {Action} from '../action';
import {Predicate} from '../predicate';
import {Step} from '../step';

const stubs = {
  fail: stub(),
  format: stub(),
  get: stub(),
  implicitlyWait: stub(),
  pageLoadTimeout: stub(),
  pass: stub(),
  perform: stub(),
  run: stub(),
  setScriptTimeout: stub(),
  test: stub()
};

proxyquire('../test', {
  './description': {format: stubs.format}, './step': {run: stubs.run}
});

import {Test} from '../test';

const driver: any = {
  manage: () => ({
    timeouts: () => ({
      implicitlyWait: stubs.implicitlyWait,
      pageLoadTimeout: stubs.pageLoadTimeout,
      setScriptTimeout: stubs.setScriptTimeout
    })
  })
};

const stepTimeout = 50;

class CustomTest extends Test {
  public constructor() {
    super(driver, stepTimeout);

    this.fail = stubs.fail;
    this.pass = stubs.pass;
  }

  public fail(message: string, cause: Error): void {
    return;
  };

  public pass(message: string): void {
    return;
  };
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
  for (const key of Object.keys(stubs)) {
    (stubs as any)[key].reset();
    (stubs as any)[key].resetBehavior();
  }
});

test('`Test.assert` should call `Test.pass`', async t => {
  t.plan(6);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.resolves(undefined);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.format.callCount, 2);
  t.is(stubs.format.args[0][0], accessor.description);
  t.is(stubs.format.args[1][0], predicate.description);

  t.is(stubs.pass.callCount, 1);
  t.is(stubs.pass.args[0][0], 'accessor predicate');

  t.is(stubs.fail.callCount, 0);
});

test('`Test.assert` should call `Test.fail`', async t => {
  t.plan(7);

  stubs.format.onFirstCall().returns('accessor');
  stubs.format.onSecondCall().returns('predicate');

  stubs.run.rejects(new Error('message'));

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.format.callCount, 2);
  t.is(stubs.format.args[0][0], accessor.description);
  t.is(stubs.format.args[1][0], predicate.description);

  t.is(stubs.pass.callCount, 0);

  t.is(stubs.fail.callCount, 1);
  t.is(stubs.fail.args[0][0], 'accessor predicate');
  t.deepEqual(stubs.fail.args[0][1], new Error('message'));
});

test('`Test.assert` should run a step with the default timeout', async t => {
  t.plan(8);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout);
});

test('`Test.assert` should run a step with an individual timeout', async t => {
  t.plan(8);

  await new CustomTest().assert(accessor, predicate, stepTimeout * 2);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout * 2);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout * 2);
});

test('`Test.assert` should create a step that returns', async t => {
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

test('`Test.assert` should create a step that throws an error', async t => {
  t.plan(6);

  stubs.get.returns('value');
  stubs.test.returns(false);

  await new CustomTest().assert(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await t.throws(step(), 'Predicate evaluates to false');

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});

test('`Test.perform` should call `Test.pass`', async t => {
  t.plan(5);

  stubs.format.onFirstCall().returns('action');

  stubs.run.resolves(undefined);

  await new CustomTest().perform(action);

  t.is(stubs.format.callCount, 1);
  t.is(stubs.format.args[0][0], action.description);

  t.is(stubs.pass.callCount, 1);
  t.is(stubs.pass.args[0][0], 'action');

  t.is(stubs.fail.callCount, 0);
});

test('`Test.perform` should call `Test.fail`', async t => {
  t.plan(6);

  stubs.format.onFirstCall().returns('action');

  stubs.run.rejects(new Error('message'));

  await new CustomTest().perform(action);

  t.is(stubs.format.callCount, 1);
  t.is(stubs.format.args[0][0], action.description);

  t.is(stubs.pass.callCount, 0);

  t.is(stubs.fail.callCount, 1);
  t.is(stubs.fail.args[0][0], 'action');
  t.deepEqual(stubs.fail.args[0][1], new Error('message'));
});

test('`Test.perform` should run a step with the default timeout', async t => {
  t.plan(8);

  await new CustomTest().perform(action);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout);
});

test('`Test.perform` should run a step with an individual timeout', async t => {
  t.plan(8);

  await new CustomTest().perform(action, stepTimeout * 2);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout * 2);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout * 2);
});

test('`Test.perform` should create a step that returns', async t => {
  t.plan(3);

  await new CustomTest().perform(action);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await step();

  t.is(stubs.perform.callCount, 1);
  t.is(stubs.perform.args[0][0], driver);
});

test('`Test.perform` should create a step that throws an error', async t => {
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
  t.plan(3);

  stubs.run.resolves(undefined);

  t.true(await new CustomTest().verify(accessor, predicate));

  t.is(stubs.pass.callCount, 0);
  t.is(stubs.fail.callCount, 0);
});

test('`Test.verify` should return false', async t => {
  t.plan(3);

  stubs.run.rejects(new Error('message'));

  t.false(await new CustomTest().verify(accessor, predicate));

  t.is(stubs.pass.callCount, 0);
  t.is(stubs.fail.callCount, 0);
});

test('`Test.verify` should run a step with the default timeout', async t => {
  t.plan(8);

  await new CustomTest().verify(accessor, predicate);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout);
});

test('`Test.verify` should run a step with an individual timeout', async t => {
  t.plan(8);

  await new CustomTest().verify(accessor, predicate, stepTimeout * 2);

  t.is(stubs.implicitlyWait.callCount, 1);
  t.is(stubs.implicitlyWait.args[0][0], stepTimeout * 2);

  t.is(stubs.pageLoadTimeout.callCount, 1);
  t.is(stubs.pageLoadTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.setScriptTimeout.callCount, 1);
  t.is(stubs.setScriptTimeout.args[0][0], stepTimeout * 2);

  t.is(stubs.run.callCount, 1);
  t.is(stubs.run.args[0][1], stepTimeout * 2);
});

test('`Test.verify` should create a step that returns', async t => {
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

test('`Test.verify` should create a step that throws an error', async t => {
  t.plan(6);

  stubs.get.returns('value');
  stubs.test.returns(false);

  await new CustomTest().verify(accessor, predicate);

  t.is(stubs.run.callCount, 1);

  const step = stubs.run.args[0][0] as Step;

  await t.throws(step(), 'Predicate evaluates to false');

  t.is(stubs.get.callCount, 1);
  t.is(stubs.get.args[0][0], driver);

  t.is(stubs.test.callCount, 1);
  t.is(stubs.test.args[0][0], 'value');
});
