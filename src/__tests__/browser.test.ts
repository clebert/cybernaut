// tslint:disable no-any

import test from 'ava';
import {stub} from 'sinon';
import {Browser} from '../browser';
import {format} from '../description';
import {Deferred} from './utils';

function createTestName(method: string, result: string): string {
  return `\`Browser.${method}\` should return an ${result}`;
}

test(createTestName('pageTitle', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().pageTitle;

  t.is(format(accessor.description), 'page title');

  const getTitle = stub().resolves('pageTitle');

  t.is(await accessor.get({getTitle} as any), 'pageTitle');

  t.is(getTitle.callCount, 1);
});

test(createTestName('pageUrl', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().pageUrl;

  t.is(format(accessor.description), 'page url');

  const getCurrentUrl = stub().resolves('pageUrl');

  t.is(await accessor.get({getCurrentUrl} as any), 'pageUrl');

  t.is(getCurrentUrl.callCount, 1);
});

test(createTestName('windowX', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowX;

  t.is(format(accessor.description), 'window x-position');

  const getPosition = stub().resolves({x: 123, y: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getPosition})})
  } as any), 123);

  t.is(getPosition.callCount, 1);
});

test(createTestName('windowY', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowY;

  t.is(format(accessor.description), 'window y-position');

  const getPosition = stub().resolves({x: 123, y: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getPosition})})
  } as any), 456);

  t.is(getPosition.callCount, 1);
});

test(createTestName('windowWidth', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowWidth;

  t.is(format(accessor.description), 'window width');

  const getSize = stub().resolves({width: 123, height: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getSize})})
  } as any), 123);

  t.is(getSize.callCount, 1);
});

test(createTestName('windowHeight', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowHeight;

  t.is(format(accessor.description), 'window height');

  const getSize = stub().resolves({width: 123, height: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getSize})})
  } as any), 456);

  t.is(getSize.callCount, 1);
});

test(createTestName('scriptResult', 'accessor'), async t => {
  t.plan(4);

  const script = () => undefined;
  const accessor = new Browser().scriptResult('scriptName', script);

  t.is(format(accessor.description), 'result of script \'scriptName\'');

  const executeAsyncScript = stub().resolves('scriptResult');

  t.is(await accessor.get({executeAsyncScript} as any), 'scriptResult');

  t.is(executeAsyncScript.callCount, 1);
  t.is(executeAsyncScript.args[0][0], script);
});

test(createTestName('executeScript', 'action'), async t => {
  t.plan(4);

  const script = () => undefined;
  const action = new Browser().executeScript('scriptName', script);

  t.is(format(action.description), 'execute script \'scriptName\'');

  const deferred = new Deferred();
  const executeAsyncScript = stub().resolves(deferred);

  await action.perform({executeAsyncScript} as any);

  t.true(deferred.done);

  t.is(executeAsyncScript.callCount, 1);
  t.is(executeAsyncScript.args[0][0], script);
});

test(createTestName('loadPage', 'action'), async t => {
  t.plan(4);

  const action = new Browser().loadPage('pageUrl');

  t.is(format(action.description), 'load page \'pageUrl\'');

  const deferred = new Deferred();
  const to = stub().resolves(deferred);

  await action.perform({navigate: () => ({to})} as any);

  t.true(deferred.done);

  t.is(to.callCount, 1);
  t.is(to.args[0][0], 'pageUrl');
});

test(createTestName('maximizeWindow', 'action'), async t => {
  t.plan(3);

  const action = new Browser().maximizeWindow();

  t.is(format(action.description), 'maximize window');

  const deferred = new Deferred();
  const maximize = stub().resolves(deferred);

  await action.perform({manage: () => ({window: () => ({maximize})})} as any);

  t.true(deferred.done);

  t.is(maximize.callCount, 1);
});

test(createTestName('navigateBack', 'action'), async t => {
  t.plan(3);

  const action = new Browser().navigateBack();

  t.is(format(action.description), 'navigate back');

  const deferred = new Deferred();
  const back = stub().resolves(deferred);

  await action.perform({navigate: () => ({back})} as any);

  t.true(deferred.done);

  t.is(back.callCount, 1);
});

test(createTestName('navigateForward', 'action'), async t => {
  t.plan(3);

  const action = new Browser().navigateForward();

  t.is(format(action.description), 'navigate forward');

  const deferred = new Deferred();
  const forward = stub().resolves(deferred);

  await action.perform({navigate: () => ({forward})} as any);

  t.true(deferred.done);

  t.is(forward.callCount, 1);
});

test(createTestName('reloadPage', 'action'), async t => {
  t.plan(3);

  const action = new Browser().reloadPage();

  t.is(format(action.description), 'reload page');

  const deferred = new Deferred();
  const refresh = stub().resolves(deferred);

  await action.perform({navigate: () => ({refresh})} as any);

  t.true(deferred.done);

  t.is(refresh.callCount, 1);
});

test(createTestName('setWindowPosition', 'action'), async t => {
  t.plan(5);

  const action = new Browser().setWindowPosition(123, 456);

  t.is(format(action.description), 'set window position to 123,456');

  const deferred = new Deferred();
  const setPosition = stub().resolves(deferred);

  await action.perform({
    manage: () => ({window: () => ({setPosition})})
  } as any);

  t.true(deferred.done);

  t.is(setPosition.callCount, 1);
  t.is(setPosition.args[0][0], 123);
  t.is(setPosition.args[0][1], 456);
});

test(createTestName('setWindowSize', 'action'), async t => {
  t.plan(5);

  const action = new Browser().setWindowSize(123, 456);

  t.is(format(action.description), 'set window size to 123x456');

  const deferred = new Deferred();
  const setSize = stub().resolves(deferred);

  await action.perform({manage: () => ({window: () => ({setSize})})} as any);

  t.true(deferred.done);

  t.is(setSize.callCount, 1);
  t.is(setSize.args[0][0], 123);
  t.is(setSize.args[0][1], 456);
});

test(createTestName('sleep', 'action'), async t => {
  t.plan(2);

  const action = new Browser().sleep(50);

  t.is(format(action.description), `sleep for ${50} ms`);

  const startTime = Date.now();

  await action.perform({} as any);

  t.true(Date.now() - startTime >= 49);
});
