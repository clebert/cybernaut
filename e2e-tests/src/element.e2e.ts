import {Key, browser, it, test, utils} from 'cybernaut';
import {rejects} from './assert';

const setNewTodoInputValueToBaz: browser.ActionScript = callback => {
  const input = document.querySelector('#new-todo-input');

  if (input) {
    input.setAttribute('value', 'baz');
  }

  callback();
};

const todoListUrl = 'file:///opt/static/todo-list.html';

const addTodoButton = browser.defineElement(
  'add-todo-button',
  '#add-todo-button'
);

const newTodoInput = browser.defineElement('new-todo-input', '#new-todo-input');
const todoList = browser.defineElement('todo-list', '#todo-list');

const todo1 = todoList.defineDescendantElement('todo-1', '.todo');
const todo2 = todoList.defineDescendantElement('todo-2', '.todo', 1);
const todo3 = todoList.defineDescendantElement('todo-3', '.todo', 2);

test('Accessor property: element.existence', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(addTodoButton.existence, it.should.equal(true));
  await t.assert(newTodoInput.existence, it.should.equal(true));
  await t.assert(todoList.existence, it.should.equal(true));

  await t.assert(todo1.existence, it.should.equal(true));
  await t.assert(todo2.existence, it.should.equal(true));
  await t.assert(todo3.existence, it.should.equal(false));
});

test('Accessor property: element.visibility', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(addTodoButton.visibility, it.should.equal(true));
  await t.assert(newTodoInput.visibility, it.should.equal(true));
  await t.assert(todoList.visibility, it.should.equal(true));

  await t.assert(todo1.visibility, it.should.equal(true));
  await t.assert(todo2.visibility, it.should.equal(true));

  await t.perform(
    browser.executeScript('hide-todo-1', callback => {
      const todo = document.querySelector('.todo:nth-child(1)');

      if (todo) {
        todo.setAttribute('style', 'display: none;');
      }

      callback();
    })
  );

  await t.assert(todo1.visibility, it.should.equal(false));
});

test('Accessor property: element.tagName', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(addTodoButton.tagName, it.should.equal('button'));
  await t.assert(newTodoInput.tagName, it.should.equal('input'));
  await t.assert(todoList.tagName, it.should.equal('ul'));

  await t.assert(todo1.tagName, it.should.equal('li'));
  await t.assert(todo2.tagName, it.should.equal('li'));
});

test('Accessor property: element.text', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(addTodoButton.text, it.should.equal('Add'));
  await t.assert(newTodoInput.text, it.should.equal(''));
  await t.assert(todoList.text, it.should.equal('foo\nbar'));

  await t.assert(todo1.text, it.should.equal('foo'));
  await t.assert(todo2.text, it.should.equal('bar'));
});

test('Accessor property: element.xPosition', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(todo1.xPosition, it.should.equal(48));
  await t.assert(todo2.xPosition, it.should.equal(48));
});

test('Accessor property: element.yPosition', async (t, config) => {
  await t.perform(browser.loadPage(todoListUrl));

  if (utils.isChrome(config)) {
    await t.assert(todo1.yPosition, it.should.equal(45));
    await t.assert(todo2.yPosition, it.should.equal(63));
  }

  if (utils.isFirefox(config)) {
    await t.assert(todo1.yPosition, it.should.equal(54));
    await t.assert(todo2.yPosition, it.should.equal(73));
  }
});

test('Accessor property: element.width', async (t, config) => {
  await t.perform(browser.loadPage(todoListUrl));

  if (utils.isChrome(config)) {
    await t.assert(todo1.width, it.should.equal(994));
    await t.assert(todo2.width, it.should.equal(994));
  }

  if (utils.isFirefox(config)) {
    await t.assert(todo1.width, it.should.equal(1096));
    await t.assert(todo2.width, it.should.equal(1096));
  }
});

test('Accessor property: element.height', async (t, config) => {
  await t.perform(browser.loadPage(todoListUrl));

  if (utils.isChrome(config)) {
    await t.assert(todo1.height, it.should.equal(18));
    await t.assert(todo2.height, it.should.equal(18));
  }

  if (utils.isFirefox(config)) {
    await t.assert(todo1.height, it.should.equal(19));
    await t.assert(todo2.height, it.should.equal(19));
  }
});

test('Accessor method: element.attributeValue()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(
    addTodoButton.attributeValue('id'),
    it.should.equal('add-todo-button')
  );

  await t.assert(
    newTodoInput.attributeValue('id'),
    it.should.equal('new-todo-input')
  );

  await t.assert(todoList.attributeValue('id'), it.should.equal('todo-list'));

  await t.assert(todo1.attributeValue('class'), it.should.equal('todo'));
  await t.assert(todo2.attributeValue('class'), it.should.equal('todo'));
});

test('Accessor method: element.cssValue()', async (t, config) => {
  await t.perform(browser.loadPage(todoListUrl));

  if (utils.isChrome(config)) {
    await t.assert(
      addTodoButton.cssValue('font-weight'),
      it.should.equal('normal')
    );

    await t.assert(
      newTodoInput.cssValue('font-weight'),
      it.should.equal('normal')
    );

    await t.assert(todoList.cssValue('font-weight'), it.should.equal('bold'));

    await t.assert(todo1.cssValue('font-weight'), it.should.equal('bold'));
    await t.assert(todo2.cssValue('font-weight'), it.should.equal('bold'));
  }

  if (utils.isFirefox(config)) {
    await t.assert(
      addTodoButton.cssValue('font-weight'),
      it.should.equal('400')
    );

    await t.assert(
      newTodoInput.cssValue('font-weight'),
      it.should.equal('400')
    );

    await t.assert(todoList.cssValue('font-weight'), it.should.equal('700'));

    await t.assert(todo1.cssValue('font-weight'), it.should.equal('700'));
    await t.assert(todo2.cssValue('font-weight'), it.should.equal('700'));
  }
});

test('Accessor method: element.descendantElementCount()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(
    addTodoButton.descendantElementCount('span'),
    it.should.equal(0)
  );

  await t.assert(
    newTodoInput.descendantElementCount('span'),
    it.should.equal(0)
  );

  await t.assert(todoList.descendantElementCount('span'), it.should.equal(2));

  await t.assert(todo1.descendantElementCount('span'), it.should.equal(1));
  await t.assert(todo2.descendantElementCount('span'), it.should.equal(1));
});

test('Action method: element.clearValue()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.assert(newTodoInput.attributeValue('value'), it.should.equal(''));

  await t.perform(
    browser.executeScript(
      'set-new-todo-input-value-to-baz',
      setNewTodoInputValueToBaz
    )
  );

  await t.assert(newTodoInput.attributeValue('value'), it.should.equal('baz'));

  await t.perform(newTodoInput.clearValue());

  await t.assert(newTodoInput.attributeValue('value'), it.should.equal(''));
});

test('Action method: element.click()', async t => {
  await t.perform(browser.loadPage(todoListUrl));

  await t.perform(
    browser.executeScript(
      'set-new-todo-input-value-to-baz',
      setNewTodoInputValueToBaz
    )
  );

  await t.assert(todo3.existence, it.should.equal(false));

  await t.perform(addTodoButton.click());

  await t.assert(todo3.existence, it.should.equal(true));
  await t.assert(todo3.text, it.should.equal('baz'));
});

test('Action method: element.sendKeys()', async (t, config) => {
  await t.perform(browser.loadPage(todoListUrl));

  if (utils.isChrome(config)) {
    await t.assert(newTodoInput.attributeValue('value'), it.should.equal(''));

    await t.perform(
      newTodoInput.sendKeys(
        'text was',
        Key.CONTROL,
        'a',
        Key.NULL,
        'now text is'
      )
    );

    await t.assert(
      newTodoInput.attributeValue('value'),
      it.should.equal('now text is')
    );

    await t.perform(newTodoInput.sendKeys(Key.NULL));

    await rejects(
      t.perform(newTodoInput.sendKeys(Key.CANCEL), {retries: 0}),
      /unknown WebDriver key/
    );

    await t.perform(newTodoInput.sendKeys(Key.HELP));
    await t.perform(newTodoInput.sendKeys(Key.BACK_SPACE));
    await t.perform(newTodoInput.sendKeys(Key.TAB));
    await t.perform(newTodoInput.sendKeys(Key.CLEAR));
    await t.perform(newTodoInput.sendKeys(Key.RETURN));
    await t.perform(newTodoInput.sendKeys(Key.ENTER));
    await t.perform(newTodoInput.sendKeys(Key.SHIFT));
    await t.perform(newTodoInput.sendKeys(Key.CONTROL));
    await t.perform(newTodoInput.sendKeys(Key.ALT));
    await t.perform(newTodoInput.sendKeys(Key.PAUSE));
    await t.perform(newTodoInput.sendKeys(Key.ESCAPE));
    await t.perform(newTodoInput.sendKeys(Key.SPACE));
    await t.perform(newTodoInput.sendKeys(Key.PAGE_UP));
    await t.perform(newTodoInput.sendKeys(Key.PAGE_DOWN));
    await t.perform(newTodoInput.sendKeys(Key.END));
    await t.perform(newTodoInput.sendKeys(Key.HOME));
    await t.perform(newTodoInput.sendKeys(Key.ARROW_LEFT));
    await t.perform(newTodoInput.sendKeys(Key.LEFT));
    await t.perform(newTodoInput.sendKeys(Key.ARROW_UP));
    await t.perform(newTodoInput.sendKeys(Key.UP));
    await t.perform(newTodoInput.sendKeys(Key.ARROW_RIGHT));
    await t.perform(newTodoInput.sendKeys(Key.RIGHT));
    await t.perform(newTodoInput.sendKeys(Key.ARROW_DOWN));
    await t.perform(newTodoInput.sendKeys(Key.DOWN));
    await t.perform(newTodoInput.sendKeys(Key.INSERT));
    await t.perform(newTodoInput.sendKeys(Key.DELETE));
    await t.perform(newTodoInput.sendKeys(Key.SEMICOLON));
    await t.perform(newTodoInput.sendKeys(Key.EQUALS));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD0));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD1));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD2));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD3));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD4));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD5));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD6));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD7));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD8));
    await t.perform(newTodoInput.sendKeys(Key.NUMPAD9));
    await t.perform(newTodoInput.sendKeys(Key.MULTIPLY));
    await t.perform(newTodoInput.sendKeys(Key.ADD));
    await t.perform(newTodoInput.sendKeys(Key.SEPARATOR));
    await t.perform(newTodoInput.sendKeys(Key.SUBTRACT));
    await t.perform(newTodoInput.sendKeys(Key.DECIMAL));
    await t.perform(newTodoInput.sendKeys(Key.DIVIDE));
    await t.perform(newTodoInput.sendKeys(Key.F1));
    await t.perform(newTodoInput.sendKeys(Key.F2));
    await t.perform(newTodoInput.sendKeys(Key.F3));
    await t.perform(newTodoInput.sendKeys(Key.F4));
    await t.perform(newTodoInput.sendKeys(Key.F5));
    await t.perform(newTodoInput.sendKeys(Key.F6));
    await t.perform(newTodoInput.sendKeys(Key.F7));
    await t.perform(newTodoInput.sendKeys(Key.F8));
    await t.perform(newTodoInput.sendKeys(Key.F9));
    await t.perform(newTodoInput.sendKeys(Key.F10));
    await t.perform(newTodoInput.sendKeys(Key.F11));
    await t.perform(newTodoInput.sendKeys(Key.F12));
    await t.perform(newTodoInput.sendKeys(Key.COMMAND));
    await t.perform(newTodoInput.sendKeys(Key.META));
  }

  if (utils.isFirefox(config)) {
    await rejects(
      t.perform(newTodoInput.sendKeys('baz'), {retries: 0}),
      /Could not convert 'text' to string/
    );
  }
});
