import test from 'ava';
import {stub} from 'sinon';
import {run} from '../step';

const stepTimeout = 100;

function createTestName(behavior: string, callCount: string): string {
  return `\`run\` should ${behavior} after it has called \`step\` ${callCount}`;
}

const never = new Promise<void>(() => undefined);

test(createTestName('return', 'once'), async t => {
  t.plan(1);

  const step = stub().resolves(undefined);

  await run(step, stepTimeout);

  t.is(step.callCount, 1);
});

test(createTestName('return', 'twice'), async t => {
  t.plan(1);

  const step = stub();

  step.onFirstCall().rejects(new Error('message'));
  step.onSecondCall().resolves(undefined);

  await run(step, stepTimeout);

  t.is(step.callCount, 2);
});

test(createTestName('throw an error', 'once'), async t => {
  t.plan(2);

  const step = stub().resolves(never);

  await t.throws(
    run(step, stepTimeout), `step timed out after ${stepTimeout} ms`
  );

  t.is(step.callCount, 1);
});

test(createTestName('throw an error', 'twice'), async t => {
  t.plan(2);

  const step = stub();

  step.onFirstCall().rejects(new Error('message'));
  step.onSecondCall().resolves(never);

  await t.throws(run(step, stepTimeout), 'message');

  t.is(step.callCount, 2);
});

test(createTestName('throw an error', 'several times'), async t => {
  t.plan(2);

  const step = stub().rejects(new Error('message'));

  await t.throws(run(step, stepTimeout), 'message');

  t.true(step.callCount > 2);
});
