// tslint:disable no-any

import proxyquire = require('proxyquire');

import test from 'ava';
import {By, Key} from 'selenium-webdriver';
import {stub} from 'sinon';
import {format} from '../description';
import {elementStubs as stubs, resetAll} from './stubs';

proxyquire.noPreserveCache();
proxyquire.preserveCache();

proxyquire('../element', {'./utils': {translate: stubs.translate}});

import {Element} from '../element';

function createTestName(method: string, result: string): string {
  return `\`Element.${method}\` should return an ${result}`;
}

let element: Element;
let namedElement: Element;

test.beforeEach(() => {
  resetAll(stubs);

  element = new Element('selector');
  namedElement = new Element('selector', 'name');
});

test(createTestName('tagName', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.tagName;

  t.is(format(accessor.description), 'tag name of element \'selector\'');

  const getTagName = stub().resolves('tagName');
  const findElement = stub().resolves({getTagName});

  t.is(await accessor.get({findElement} as any), 'tagName');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getTagName.callCount, 1);

  t.is(
    format(namedElement.tagName.description), 'tag name of name \'selector\''
  );
});

test(createTestName('text', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.text;

  t.is(format(accessor.description), 'text of element \'selector\'');

  const getText = stub().resolves('text');
  const findElement = stub().resolves({getText});

  t.is(await accessor.get({findElement} as any), 'text');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getText.callCount, 1);

  t.is(format(namedElement.text.description), 'text of name \'selector\'');
});

test(createTestName('visibility', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.visibility;

  t.is(format(accessor.description), 'visibility of element \'selector\'');

  const isDisplayed = stub().resolves(true);
  const findElement = stub().resolves({isDisplayed});

  t.is(await accessor.get({findElement} as any), true);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(isDisplayed.callCount, 1);

  t.is(
    format(namedElement.visibility.description),
    'visibility of name \'selector\''
  );
});

test(createTestName('x', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.x;

  t.is(format(accessor.description), 'x-position of element \'selector\'');

  const getLocation = stub().resolves({x: 123, y: 456});
  const findElement = stub().resolves({getLocation});

  t.is(await accessor.get({findElement} as any), 123);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getLocation.callCount, 1);

  t.is(format(namedElement.x.description), 'x-position of name \'selector\'');
});

test(createTestName('y', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.y;

  t.is(format(accessor.description), 'y-position of element \'selector\'');

  const getLocation = stub().resolves({x: 123, y: 456});
  const findElement = stub().resolves({getLocation});

  t.is(await accessor.get({findElement} as any), 456);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getLocation.callCount, 1);

  t.is(format(namedElement.y.description), 'y-position of name \'selector\'');
});

test(createTestName('width', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.width;

  t.is(format(accessor.description), 'width of element \'selector\'');

  const getSize = stub().resolves({width: 123, height: 456});
  const findElement = stub().resolves({getSize});

  t.is(await accessor.get({findElement} as any), 123);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getSize.callCount, 1);

  t.is(format(namedElement.width.description), 'width of name \'selector\'');
});

test(createTestName('height', 'accessor'), async t => {
  t.plan(6);

  const accessor = element.height;

  t.is(format(accessor.description), 'height of element \'selector\'');

  const getSize = stub().resolves({width: 123, height: 456});
  const findElement = stub().resolves({getSize});

  t.is(await accessor.get({findElement} as any), 456);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getSize.callCount, 1);

  t.is(format(namedElement.height.description), 'height of name \'selector\'');
});

test(createTestName('cssValue', 'accessor'), async t => {
  t.plan(7);

  const accessor = element.cssValue('cssName');

  t.is(
    format(accessor.description),
    'css value \'cssName\' of element \'selector\''
  );

  const getCssValue = stub().resolves('cssValue');
  const findElement = stub().resolves({getCssValue});

  t.is(await accessor.get({findElement} as any), 'cssValue');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getCssValue.callCount, 1);
  t.is(getCssValue.args[0][0], 'cssName');

  t.is(
    format(namedElement.cssValue('cssName').description),
    'css value \'cssName\' of name \'selector\''
  );
});

test(createTestName('propertyValue', 'accessor'), async t => {
  t.plan(7);

  const accessor = element.propertyValue('propertyName');

  t.is(
    format(accessor.description),
    'property value \'propertyName\' of element \'selector\''
  );

  const getAttribute = stub().resolves('attribute');
  const findElement = stub().resolves({getAttribute});

  t.is(await accessor.get({findElement} as any), 'attribute');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getAttribute.callCount, 1);
  t.is(getAttribute.args[0][0], 'propertyName');

  t.is(
    format(namedElement.propertyValue('propertyName').description),
    'property value \'propertyName\' of name \'selector\''
  );
});

test(createTestName('clearValue', 'action'), async t => {
  t.plan(6);

  const action = element.clearValue();

  t.is(format(action.description), 'clear value of element \'selector\'');

  const clear = stub().rejects(new Error('foo'));
  const findElement = stub().resolves({clear});

  await t.throws(action.perform({findElement} as any), 'foo');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(clear.callCount, 1);

  t.is(
    format(namedElement.clearValue().description),
    'clear value of name \'selector\''
  );
});

test(createTestName('click', 'action'), async t => {
  t.plan(6);

  const action = element.click();

  t.is(format(action.description), 'click on element \'selector\'');

  const click = stub().rejects(new Error('foo'));
  const findElement = stub().resolves({click});

  await t.throws(action.perform({findElement} as any), 'foo');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(click.callCount, 1);

  t.is(format(namedElement.click().description), 'click on name \'selector\'');
});

test(createTestName('sendKeys', 'action'), async t => {
  t.plan(13);

  stubs.translate.onFirstCall().returns('Key.CONTROL');
  stubs.translate.onSecondCall().returns('a');
  stubs.translate.onThirdCall().returns('Key.NULL');

  const action = element.sendKeys(Key.CONTROL, 'a', Key.NULL);

  t.is(
    format(action.description),
    'send keys [ \'Key.CONTROL\', \'a\', \'Key.NULL\' ] to element \'selector\''
  );

  t.is(stubs.translate.callCount, 3);
  t.is(stubs.translate.args[0][0], Key.CONTROL);
  t.is(stubs.translate.args[1][0], 'a');
  t.is(stubs.translate.args[2][0], Key.NULL);

  const sendKeys = stub().rejects(new Error('foo'));
  const findElement = stub().resolves({sendKeys});

  await t.throws(action.perform({findElement} as any), 'foo');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(sendKeys.callCount, 1);
  t.is(sendKeys.args[0][0], Key.CONTROL);
  t.is(sendKeys.args[0][1], 'a');
  t.is(sendKeys.args[0][2], Key.NULL);

  stubs.translate.reset();

  stubs.translate.onFirstCall().returns('Key.CONTROL');
  stubs.translate.onSecondCall().returns('a');
  stubs.translate.onThirdCall().returns('Key.NULL');

  t.is(
    format(namedElement.sendKeys(Key.CONTROL, 'a', Key.NULL).description),
    'send keys [ \'Key.CONTROL\', \'a\', \'Key.NULL\' ] to name \'selector\''
  );
});

test(createTestName('submitForm', 'action'), async t => {
  t.plan(6);

  const action = element.submitForm();

  t.is(
    format(action.description), 'submit form containing element \'selector\''
  );

  const submit = stub().rejects(new Error('foo'));
  const findElement = stub().resolves({submit});

  await t.throws(action.perform({findElement} as any), 'foo');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(submit.callCount, 1);

  t.is(
    format(namedElement.submitForm().description),
    'submit form containing name \'selector\''
  );
});
