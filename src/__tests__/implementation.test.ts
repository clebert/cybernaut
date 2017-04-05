// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {stub} from 'sinon';

const Builder = stub();

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../implementation', {'selenium-webdriver': {Builder}});

import {execute} from '../implementation';

test.beforeEach(() => {
  Builder.reset();
  Builder.resetBehavior();
});

test('TODO', async t => {
  const build = stub();
  const capabilities = {};
  const implementation = stub();
  const implicitlyWait = stub();
  const pageLoadTimeout = stub();
  const pass = stub();
  const quit = stub();
  const setScriptTimeout = stub();
  const withCapabilities = stub();

  Builder.returns({withCapabilities});
  withCapabilities.returns({build});

  build.resolves({
    manage: () => ({
      timeouts: () => ({implicitlyWait, pageLoadTimeout, setScriptTimeout})
    }),
    quit
  });

  await execute(implementation, {pass} as any, {
    capabilities, retries: 1, retryDelay: 2, timeouts: {
      element: 3, page: 4, script: 5
    }
  });

  // const tapTest = implementation.args[0][0];

  // console.log(tapTest);
});
