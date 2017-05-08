import test from 'ava';
import {Key} from 'selenium-webdriver';
import {stub} from 'sinon';
import {sleep, translate} from '../utils';

const name = '`sleep` should return a promise ' +
  'that resolves after the specified amount of time';

test(name, async t => {
  t.plan(4);

  const _setTimeout = stub();

  let resolved = false;

  const promise = sleep(50, _setTimeout).then(() => resolved = true);

  t.is(_setTimeout.callCount, 1);
  t.is(_setTimeout.args[0][1], 50);

  await new Promise<void>(resolve => {
    setImmediate(resolve);
  });

  t.false(resolved);

  _setTimeout.args[0][0]();

  await promise;

  t.true(resolved);
});

test('`translate` should return the name for pressable keys', t => {
  t.plan(189);

  t.is(translate('toString'), 'toString');

  for (let i = 0; i <= 0x7F; i += 1) {
    t.is(translate(String.fromCharCode(i)), String.fromCharCode(i));
  }

  t.is(translate(Key.NULL), 'Key.NULL');
  t.is(translate(Key.CANCEL), 'Key.CANCEL');
  t.is(translate(Key.HELP), 'Key.HELP');
  t.is(translate(Key.BACK_SPACE), 'Key.BACK_SPACE');
  t.is(translate(Key.TAB), 'Key.TAB');
  t.is(translate(Key.CLEAR), 'Key.CLEAR');
  t.is(translate(Key.RETURN), 'Key.RETURN');
  t.is(translate(Key.ENTER), 'Key.ENTER');
  t.is(translate(Key.SHIFT), 'Key.SHIFT');
  t.is(translate(Key.CONTROL), 'Key.CONTROL');
  t.is(translate(Key.ALT), 'Key.ALT');
  t.is(translate(Key.PAUSE), 'Key.PAUSE');
  t.is(translate(Key.ESCAPE), 'Key.ESCAPE');
  t.is(translate(Key.SPACE), 'Key.SPACE');
  t.is(translate(Key.PAGE_UP), 'Key.PAGE_UP');
  t.is(translate(Key.PAGE_DOWN), 'Key.PAGE_DOWN');
  t.is(translate(Key.END), 'Key.END');
  t.is(translate(Key.HOME), 'Key.HOME');
  t.is(translate(Key.ARROW_LEFT), 'Key.LEFT');
  t.is(translate(Key.LEFT), 'Key.LEFT');
  t.is(translate(Key.ARROW_UP), 'Key.UP');
  t.is(translate(Key.UP), 'Key.UP');
  t.is(translate(Key.ARROW_RIGHT), 'Key.RIGHT');
  t.is(translate(Key.RIGHT), 'Key.RIGHT');
  t.is(translate(Key.ARROW_DOWN), 'Key.DOWN');
  t.is(translate(Key.DOWN), 'Key.DOWN');
  t.is(translate(Key.INSERT), 'Key.INSERT');
  t.is(translate(Key.DELETE), 'Key.DELETE');
  t.is(translate(Key.SEMICOLON), 'Key.SEMICOLON');
  t.is(translate(Key.EQUALS), 'Key.EQUALS');

  t.is(translate(Key.NUMPAD0), 'Key.NUMPAD0');
  t.is(translate(Key.NUMPAD1), 'Key.NUMPAD1');
  t.is(translate(Key.NUMPAD2), 'Key.NUMPAD2');
  t.is(translate(Key.NUMPAD3), 'Key.NUMPAD3');
  t.is(translate(Key.NUMPAD4), 'Key.NUMPAD4');
  t.is(translate(Key.NUMPAD5), 'Key.NUMPAD5');
  t.is(translate(Key.NUMPAD6), 'Key.NUMPAD6');
  t.is(translate(Key.NUMPAD7), 'Key.NUMPAD7');
  t.is(translate(Key.NUMPAD8), 'Key.NUMPAD8');
  t.is(translate(Key.NUMPAD9), 'Key.NUMPAD9');
  t.is(translate(Key.MULTIPLY), 'Key.MULTIPLY');
  t.is(translate(Key.ADD), 'Key.ADD');
  t.is(translate(Key.SEPARATOR), 'Key.SEPARATOR');
  t.is(translate(Key.SUBTRACT), 'Key.SUBTRACT');
  t.is(translate(Key.DECIMAL), 'Key.DECIMAL');
  t.is(translate(Key.DIVIDE), 'Key.DIVIDE');

  t.is(translate(Key.F1), 'Key.F1');
  t.is(translate(Key.F2), 'Key.F2');
  t.is(translate(Key.F3), 'Key.F3');
  t.is(translate(Key.F4), 'Key.F4');
  t.is(translate(Key.F5), 'Key.F5');
  t.is(translate(Key.F6), 'Key.F6');
  t.is(translate(Key.F7), 'Key.F7');
  t.is(translate(Key.F8), 'Key.F8');
  t.is(translate(Key.F9), 'Key.F9');
  t.is(translate(Key.F10), 'Key.F10');
  t.is(translate(Key.F11), 'Key.F11');
  t.is(translate(Key.F12), 'Key.F12');

  t.is(translate(Key.COMMAND), 'Key.META');
  t.is(translate(Key.META), 'Key.META');
});
