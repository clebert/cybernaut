// tslint:disable no-any

import test from 'ava';
import {By} from 'selenium-webdriver';
import {stub} from 'sinon';
import {format} from '../description';
import {Element} from '../element';
import {Deferred} from './utils';

function createTestName(method: string, result: string): string {
  return `\`Element.${method}\` should return an ${result}`;
}

let element: Element;

test.beforeEach(() => {
  element = new Element('selector');
});

test(createTestName('tagName', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.tagName;

  t.is(format(accessor.description), 'tag name of element \'selector\'');

  const getTagName = stub().resolves('tagName');
  const findElement = stub().resolves({getTagName});

  t.is(await accessor.get({findElement} as any), 'tagName');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getTagName.callCount, 1);
});

test(createTestName('text', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.text;

  t.is(format(accessor.description), 'text of element \'selector\'');

  const getText = stub().resolves('text');
  const findElement = stub().resolves({getText});

  t.is(await accessor.get({findElement} as any), 'text');

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getText.callCount, 1);
});

test(createTestName('visibility', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.visibility;

  t.is(format(accessor.description), 'visibility of element \'selector\'');

  const isDisplayed = stub().resolves(true);
  const findElement = stub().resolves({isDisplayed});

  t.is(await accessor.get({findElement} as any), true);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(isDisplayed.callCount, 1);
});

test(createTestName('x', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.x;

  t.is(format(accessor.description), 'x-position of element \'selector\'');

  const getLocation = stub().resolves({x: 123, y: 456});
  const findElement = stub().resolves({getLocation});

  t.is(await accessor.get({findElement} as any), 123);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getLocation.callCount, 1);
});

test(createTestName('y', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.y;

  t.is(format(accessor.description), 'y-position of element \'selector\'');

  const getLocation = stub().resolves({x: 123, y: 456});
  const findElement = stub().resolves({getLocation});

  t.is(await accessor.get({findElement} as any), 456);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getLocation.callCount, 1);
});

test(createTestName('width', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.width;

  t.is(format(accessor.description), 'width of element \'selector\'');

  const getSize = stub().resolves({width: 123, height: 456});
  const findElement = stub().resolves({getSize});

  t.is(await accessor.get({findElement} as any), 123);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getSize.callCount, 1);
});

test(createTestName('height', 'accessor'), async t => {
  t.plan(5);

  const accessor = element.height;

  t.is(format(accessor.description), 'height of element \'selector\'');

  const getSize = stub().resolves({width: 123, height: 456});
  const findElement = stub().resolves({getSize});

  t.is(await accessor.get({findElement} as any), 456);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(getSize.callCount, 1);
});

test(createTestName('cssValue', 'accessor'), async t => {
  t.plan(6);

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
});

test(createTestName('propertyValue', 'accessor'), async t => {
  t.plan(6);

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
});

test(createTestName('clearValue', 'action'), async t => {
  t.plan(5);

  const action = element.clearValue();

  t.is(format(action.description), 'clear value of element \'selector\'');

  const deferred = new Deferred();
  const clear = stub().resolves(deferred);
  const findElement = stub().resolves({clear});

  await action.perform({findElement} as any);

  t.true(deferred.done);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(clear.callCount, 1);
});

test(createTestName('click', 'action'), async t => {
  t.plan(5);

  const action = element.click();

  t.is(format(action.description), 'click on element \'selector\'');

  const deferred = new Deferred();
  const click = stub().resolves(deferred);
  const findElement = stub().resolves({click});

  await action.perform({findElement} as any);

  t.true(deferred.done);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(click.callCount, 1);
});

test(createTestName('sendKeys', 'action'), async t => {
  t.plan(7);

  const action = element.sendKeys('key1', 'key2');

  t.is(
    format(action.description),
    'send keys [ \'key1\', \'key2\' ] to element \'selector\''
  );

  const deferred = new Deferred();
  const sendKeys = stub().resolves(deferred);
  const findElement = stub().resolves({sendKeys});

  await action.perform({findElement} as any);

  t.true(deferred.done);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(sendKeys.callCount, 1);
  t.is(sendKeys.args[0][0], 'key1');
  t.is(sendKeys.args[0][1], 'key2');
});

test(createTestName('submitForm', 'action'), async t => {
  t.plan(5);

  const action = element.submitForm();

  t.is(
    format(action.description), 'submit form containing element \'selector\''
  );

  const deferred = new Deferred();
  const submit = stub().resolves(deferred);
  const findElement = stub().resolves({submit});

  await action.perform({findElement} as any);

  t.true(deferred.done);

  t.is(findElement.callCount, 1);
  t.deepEqual(findElement.args[0][0], By.css('selector'));

  t.is(submit.callCount, 1);
});
