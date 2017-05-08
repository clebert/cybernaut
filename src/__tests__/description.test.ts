import test from 'ava';
import {format} from '../description';

test('`format` should return a formatted string', async t => {
  t.plan(5);

  t.is(format({template: ''}), '');
  t.is(format({template: '', args: []}), '');

  t.is(
    format({
      template: '{} {} {} {} {} {}', args: [true, 1, '', null, undefined, /foo/]
    }),
    'true 1 \'\' null undefined /foo/'
  );

  t.is(
    format({template: '{}', args: [[null, undefined]]}),
    '[ null, undefined ]'
  );

  t.is(
    format({template: '{}', args: [{null: null, undefined}]}),
    '{ null: null, undefined: undefined }'
  );
});

test('`format` should throw an error', async t => {
  t.plan(4);

  t.throws(
    () => {
      format({template: '{}'});
    },
    'missing format argument'
  );

  t.throws(
    () => {
      format({template: '{}', args: []});
    },
    'missing format argument'
  );

  t.throws(
    () => {
      format({template: '', args: [null]});
    },
    'superfluous format argument'
  );

  t.throws(
    () => {
      format({template: '{}', args: [null, undefined]});
    },
    'superfluous format argument'
  );
});
