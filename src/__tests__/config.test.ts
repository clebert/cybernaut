// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {stub} from 'sinon';
import {configStubs as stubs, resetAll} from './stubs';

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../config', {path: {resolve: stubs.resolve}});

import {Config, loadConfig, validate} from '../config';

const customConfig: Config = {
  capabilities: {browserName: 'foo'},
  concurrency: 123,
  dependencies: ['foo'],
  exclude: ['bar'],
  include: 'foo',
  retries: 456,
  retryDelay: 789,
  screenshotDirectory: 'bar',
  timeouts: {element: 123, page: 456, script: 789}
};

const defaultConfig: Config = {
  capabilities: {browserName: 'chrome'},
  concurrency: 1,
  dependencies: ['chromedriver'],
  exclude: ['**/node_modules/**/*'],
  include: '**/*.e2e.js',
  retries: 4,
  retryDelay: 500,
  screenshotDirectory: 'screenshots',
  timeouts: {element: 0, page: 30000, script: 30000}
};

test.beforeEach(() => {
  resetAll(stubs);

  stubs.resolve.returns('filename');
});

test('`loadConfig` should return the default config', t => {
  t.plan(3);

  const _require = stub().returns(customConfig);

  t.deepEqual(loadConfig(undefined, _require as any), defaultConfig);

  t.is(stubs.resolve.callCount, 0);

  t.is(_require.callCount, 0);
});

test('`loadConfig` should return a completely custom config', t => {
  t.plan(5);

  const _require = stub().returns(customConfig);

  t.deepEqual(loadConfig('foo', _require as any), customConfig);

  t.is(stubs.resolve.callCount, 1);
  t.is(stubs.resolve.args[0][0], 'foo');

  t.is(_require.callCount, 1);
  t.is(_require.args[0][0], 'filename');
});

test('`loadConfig` should return a partly custom config', t => {
  t.plan(5);

  const _require = stub().returns({capabilities: {browserName: 'foo'}});

  t.deepEqual(loadConfig('foo', _require as any), {
    ...defaultConfig, capabilities: {browserName: 'foo'}
  });

  t.is(stubs.resolve.callCount, 1);
  t.is(stubs.resolve.args[0][0], 'foo');

  t.is(_require.callCount, 1);
  t.is(_require.args[0][0], 'filename');
});

test('`loadConfig` should throw an error', t => {
  t.plan(5);

  const _require = stub().throws(new Error('foo'));

  t.throws(() => loadConfig('bar', _require as any), 'foo');

  t.is(stubs.resolve.callCount, 1);
  t.is(stubs.resolve.args[0][0], 'bar');

  t.is(_require.callCount, 1);
  t.is(_require.args[0][0], 'filename');
});

test('`validate` should return no errors', t => {
  t.plan(4);

  let config: any = defaultConfig;

  t.deepEqual(validate(config), []);

  // schema.properties.capabilities.additionalProperties
  config = {
    ...defaultConfig, capabilities: {browserName: 'chrome', foo: 'bar'}
  };

  t.deepEqual(validate(config), []);

  // schema.properties.dependencies.minItems
  config = {...defaultConfig, dependencies: []};

  t.deepEqual(validate(config), []);

  // schema.properties.exclude.minItems
  config = {...defaultConfig, exclude: []};

  t.deepEqual(validate(config), []);
});

test('`validate` should return errors', t => {
  t.plan(39);

  // schema.type
  let config: any = [];

  t.deepEqual(validate(config), ['config should be object']);

  // schema.required
  config = {};

  t.deepEqual(validate(config), [
    'config should have required property \'capabilities\'',
    'config should have required property \'concurrency\'',
    'config should have required property \'dependencies\'',
    'config should have required property \'exclude\'',
    'config should have required property \'include\'',
    'config should have required property \'retries\'',
    'config should have required property \'retryDelay\'',
    'config should have required property \'screenshotDirectory\'',
    'config should have required property \'timeouts\''
  ]);

  // schema.additionalProperties
  config = {...defaultConfig, foo: 'bar'};

  t.deepEqual(validate(config), [
    'config should NOT have additional properties'
  ]);

  /****************************************************************************/

  // schema.properties.capabilities.type
  config = {...defaultConfig, capabilities: []};

  t.deepEqual(validate(config), ['config.capabilities should be object']);

  // schema.properties.capabilities.required
  config = {...defaultConfig, capabilities: {}};

  t.deepEqual(validate(config), [
    'config.capabilities should have required property \'browserName\''
  ]);

  /****************************************************************************/

  // schema.properties.capabilities.properties.browserName.enum
  config = {...defaultConfig, capabilities: {browserName: 'foo'}};

  t.deepEqual(validate(config), [
    'config.capabilities.browserName' +
    ' should be equal to one of the allowed values'
  ]);

  /****************************************************************************/

  // schema.properties.concurrency.type
  config = {...defaultConfig, concurrency: '123'};

  t.deepEqual(validate(config), ['config.concurrency should be number']);

  // schema.properties.concurrency.minimum
  config = {...defaultConfig, concurrency: 0};

  t.deepEqual(validate(config), ['config.concurrency should be >= 1']);

  // schema.properties.concurrency.multipleOf
  config = {...defaultConfig, concurrency: 123.5};

  t.deepEqual(validate(config), ['config.concurrency should be multiple of 1']);

  /****************************************************************************/

  // schema.properties.dependencies.type
  config = {...defaultConfig, dependencies: {}};

  t.deepEqual(validate(config), ['config.dependencies should be array']);

  // schema.properties.dependencies.uniqueItems
  config = {...defaultConfig, dependencies: ['foo', 'foo']};

  t.deepEqual(validate(config), [
    'config.dependencies should NOT have duplicate items ' +
    '(items ## 0 and 1 are identical)'
  ]);

  /****************************************************************************/

  // schema.properties.dependencies.items.type
  config = {...defaultConfig, dependencies: [123]};

  t.deepEqual(validate(config), ['config.dependencies[0] should be string']);

  // schema.properties.dependencies.items.minLength
  config = {...defaultConfig, dependencies: ['']};

  t.deepEqual(validate(config), [
    'config.dependencies[0] should NOT be shorter than 1 characters'
  ]);

  /****************************************************************************/

  // schema.properties.exclude.type
  config = {...defaultConfig, exclude: {}};

  t.deepEqual(validate(config), ['config.exclude should be array']);

  // schema.properties.exclude.uniqueItems
  config = {...defaultConfig, exclude: ['foo', 'foo']};

  t.deepEqual(validate(config), [
    'config.exclude should NOT have duplicate items ' +
    '(items ## 0 and 1 are identical)'
  ]);

  /****************************************************************************/

  // schema.properties.exclude.items.type
  config = {...defaultConfig, exclude: [123]};

  t.deepEqual(validate(config), ['config.exclude[0] should be string']);

  // schema.properties.exclude.items.minLength
  config = {...defaultConfig, exclude: ['']};

  t.deepEqual(validate(config), [
    'config.exclude[0] should NOT be shorter than 1 characters'
  ]);

  /****************************************************************************/

  // schema.properties.include.type
  config = {...defaultConfig, include: 123};

  t.deepEqual(validate(config), ['config.include should be string']);

  // schema.properties.include.minLength
  config = {...defaultConfig, include: ''};

  t.deepEqual(validate(config), [
    'config.include should NOT be shorter than 1 characters'
  ]);

  /****************************************************************************/

  // schema.properties.retries.type
  config = {...defaultConfig, retries: '123'};

  t.deepEqual(validate(config), ['config.retries should be number']);

  // schema.properties.retries.minimum
  config = {...defaultConfig, retries: -1};

  t.deepEqual(validate(config), ['config.retries should be >= 0']);

  // schema.properties.retries.multipleOf
  config = {...defaultConfig, retries: 123.5};

  t.deepEqual(validate(config), ['config.retries should be multiple of 1']);

  /****************************************************************************/

  // schema.properties.retryDelay.type
  config = {...defaultConfig, retryDelay: '123'};

  t.deepEqual(validate(config), ['config.retryDelay should be number']);

  // schema.properties.retryDelay.minimum
  config = {...defaultConfig, retryDelay: -1};

  t.deepEqual(validate(config), ['config.retryDelay should be >= 0']);

  // schema.properties.retryDelay.multipleOf
  config = {...defaultConfig, retryDelay: 123.5};

  t.deepEqual(validate(config), ['config.retryDelay should be multiple of 1']);

  /****************************************************************************/

  // schema.properties.screenshotDirectory.type
  config = {...defaultConfig, screenshotDirectory: 123};

  t.deepEqual(validate(config), [
    'config.screenshotDirectory should be string'
  ]);

  // schema.properties.screenshotDirectory.minLength
  config = {...defaultConfig, screenshotDirectory: ''};

  t.deepEqual(validate(config), [
    'config.screenshotDirectory should NOT be shorter than 1 characters'
  ]);

  /****************************************************************************/

  // schema.properties.timeouts.type
  config = {...defaultConfig, timeouts: []};

  t.deepEqual(validate(config), ['config.timeouts should be object']);

  // schema.properties.timeouts.required
  config = {...defaultConfig, timeouts: {}};

  t.deepEqual(validate(config), [
    'config.timeouts should have required property \'element\'',
    'config.timeouts should have required property \'page\'',
    'config.timeouts should have required property \'script\''
  ]);

  // schema.properties.timeouts.additionalProperties
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, foo: 'bar'}
  };

  t.deepEqual(validate(config), [
    'config.timeouts should NOT have additional properties'
  ]);

  /****************************************************************************/

  // schema.properties.timeouts.properties.element.type
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, element: '123'}
  };

  t.deepEqual(validate(config), ['config.timeouts.element should be number']);

  // schema.properties.timeouts.properties.element.minimum
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, element: -1}
  };

  t.deepEqual(validate(config), ['config.timeouts.element should be >= 0']);

  // schema.properties.timeouts.properties.element.multipleOf
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, element: 123.5}
  };

  t.deepEqual(validate(config), [
    'config.timeouts.element should be multiple of 1'
  ]);

  /****************************************************************************/

  // schema.properties.timeouts.properties.page.type
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, page: '123'}
  };

  t.deepEqual(validate(config), ['config.timeouts.page should be number']);

  // schema.properties.timeouts.properties.page.minimum
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, page: -1}
  };

  t.deepEqual(validate(config), ['config.timeouts.page should be >= 0']);

  // schema.properties.timeouts.properties.page.multipleOf
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, page: 123.5}
  };

  t.deepEqual(validate(config), [
    'config.timeouts.page should be multiple of 1'
  ]);

  /****************************************************************************/

  // schema.properties.timeouts.properties.script.type
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, script: '123'}
  };

  t.deepEqual(validate(config), ['config.timeouts.script should be number']);

  // schema.properties.timeouts.properties.script.minimum
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, script: -1}
  };

  t.deepEqual(validate(config), ['config.timeouts.script should be >= 0']);

  // schema.properties.timeouts.properties.script.multipleOf
  config = {
    ...defaultConfig, timeouts: {...defaultConfig.timeouts, script: 123.5}
  };

  t.deepEqual(validate(config), [
    'config.timeouts.script should be multiple of 1'
  ]);
});
