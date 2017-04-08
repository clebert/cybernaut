import test from 'ava';

const schema = require('../../config-schema.json');

test('`$schema` should be "http://json-schema.org/draft-04/schema#"', t => {
  t.is(schema.$schema, 'http://json-schema.org/draft-04/schema#');
});

test('`required` should be undefined', t => {
  t.is(schema.required, undefined);
});
