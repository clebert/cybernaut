import test from 'ava';
import {format} from '../description';

test('`format` should return a formatted string', async t => {
  t.plan(5);

  t.is(format({template: ''}), '');
  t.is(format({template: '', args: []}), '');

  t.is(format({
    template: '{} {} {} {} {}', args: [true, 1, '', null, undefined]
  }), 'true 1 \'\' null undefined');

  t.is(format({
    template: '{}', args: [[null, undefined]]
  }), '[ null, undefined ]');

  t.is(format({
    template: '{}', args: [{null: null, undefined}]
  }), '{ null: null, undefined: undefined }');
});

test('`format` should throw an error', async t => {
  t.plan(4);

  t.throws(() => {
    format({template: '{}'});
  }, 'Missing format argument');

  t.throws(() => {
    format({template: '{}', args: []});
  }, 'Missing format argument');

  t.throws(() => {
    format({template: '', args: [null]});
  }, 'Superfluous format argument');

  t.throws(() => {
    format({template: '{}', args: [null, undefined]});
  }, 'Superfluous format argument');
});
