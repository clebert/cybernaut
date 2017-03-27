const {skip, test} = require('../dist/index');

test('foo');

skip('bar', t => {
  // ...
});
