// tslint:disable no-any

import test from 'ava';
import {stub} from 'sinon';
import {Browser} from '../browser';
import {format} from '../description';

function createTestName(methodName: string, resultName: string): string {
  return `\`${methodName}\` should return an ${resultName}`;
}

test(createTestName('Browser.pageTitle', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().pageTitle;

  t.is(format(accessor.description), 'page title');

  const getTitle = stub().resolves('pageTitle');

  t.is(await accessor.get({getTitle} as any), 'pageTitle');

  t.is(getTitle.callCount, 1);
});

test(createTestName('Browser.pageUrl', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().pageUrl;

  t.is(format(accessor.description), 'page url');

  const getCurrentUrl = stub().resolves('pageUrl');

  t.is(await accessor.get({getCurrentUrl} as any), 'pageUrl');

  t.is(getCurrentUrl.callCount, 1);
});

test(createTestName('Browser.windowX', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowX;

  t.is(format(accessor.description), 'window x-position');

  const getPosition = stub().resolves({x: 123, y: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getPosition})})
  } as any), 123);

  t.is(getPosition.callCount, 1);
});

test(createTestName('Browser.windowY', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowY;

  t.is(format(accessor.description), 'window y-position');

  const getPosition = stub().resolves({x: 123, y: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getPosition})})
  } as any), 456);

  t.is(getPosition.callCount, 1);
});

test(createTestName('Browser.windowWidth', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowWidth;

  t.is(format(accessor.description), 'window width');

  const getSize = stub().resolves({width: 123, height: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getSize})})
  } as any), 123);

  t.is(getSize.callCount, 1);
});

test(createTestName('Browser.windowHeight', 'accessor'), async t => {
  t.plan(3);

  const accessor = new Browser().windowHeight;

  t.is(format(accessor.description), 'window height');

  const getSize = stub().resolves({width: 123, height: 456});

  t.is(await accessor.get({
    manage: () => ({window: () => ({getSize})})
  } as any), 456);

  t.is(getSize.callCount, 1);
});

test(createTestName('Browser.loadPage', 'action'), async t => {
  t.plan(3);

  const action = new Browser().loadPage('pageUrl');

  t.is(format(action.description), 'load page \'pageUrl\'');

  const to = stub();

  await action.perform({navigate: () => ({to})} as any);

  t.is(to.callCount, 1);
  t.is(to.args[0][0], 'pageUrl');
});

test(createTestName('Browser.maximizeWindow', 'action'), async t => {
  t.plan(2);

  const action = new Browser().maximizeWindow();

  t.is(format(action.description), 'maximize window');

  const maximize = stub();

  await action.perform({
    manage: () => ({window: () => ({maximize})})
  } as any);

  t.is(maximize.callCount, 1);
});

test(createTestName('Browser.navigateBack', 'action'), async t => {
  t.plan(2);

  const action = new Browser().navigateBack();

  t.is(format(action.description), 'navigate back');

  const back = stub();

  await action.perform({navigate: () => ({back})} as any);

  t.is(back.callCount, 1);
});

test(createTestName('Browser.navigateForward', 'action'), async t => {
  t.plan(2);

  const action = new Browser().navigateForward();

  t.is(format(action.description), 'navigate forward');

  const forward = stub();

  await action.perform({navigate: () => ({forward})} as any);

  t.is(forward.callCount, 1);
});

test(createTestName('Browser.reloadPage', 'action'), async t => {
  t.plan(2);

  const action = new Browser().reloadPage();

  t.is(format(action.description), 'reload page');

  const refresh = stub();

  await action.perform({navigate: () => ({refresh})} as any);

  t.is(refresh.callCount, 1);
});

test(createTestName('Browser.setWindowPosition', 'action'), async t => {
  t.plan(4);

  const action = new Browser().setWindowPosition(123, 456);

  t.is(format(action.description), 'set window position to 123,456');

  const setPosition = stub();

  await action.perform({
    manage: () => ({window: () => ({setPosition})})
  } as any);

  t.is(setPosition.callCount, 1);
  t.is(setPosition.args[0][0], 123);
  t.is(setPosition.args[0][1], 456);
});

test(createTestName('Browser.setWindowSize', 'action'), async t => {
  t.plan(4);

  const action = new Browser().setWindowSize(123, 456);

  t.is(format(action.description), 'set window size to 123x456');

  const setSize = stub();

  await action.perform({
    manage: () => ({window: () => ({setSize})})
  } as any);

  t.is(setSize.callCount, 1);
  t.is(setSize.args[0][0], 123);
  t.is(setSize.args[0][1], 456);
});

test(createTestName('Browser.sleep', 'action'), async t => {
  t.plan(2);

  const action = new Browser().sleep(100);

  t.is(format(action.description), 'sleep for 100 ms');

  const startTime = Date.now();

  await action.perform({} as any);

  t.true(Date.now() - startTime >= 100);
});
