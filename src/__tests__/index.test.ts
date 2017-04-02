import test from 'ava';
import {execFile} from 'child_process';
import {join} from 'path';

interface Result {
  readonly error: Error | null;
  readonly stdout: string;
  readonly stderr: string;
}

const customStderr = `
Config:
  capabilities: { browserName: 'phantomjs' }
  concurrency: 2
  dependencies: []
  exclude: [ 'custom-config.js' ]
  include: '*.js'
  retries: 3
  retryDelay: 1000
  screenshotDirectory: '/dev/null'
`;

const defaultStderr = `
Config:
  capabilities: { browserName: 'chrome' }
  concurrency: 1
  dependencies: [ 'chromedriver' ]
  exclude: [ '**/node_modules/**/*' ]
  include: '**/*.e2e.js'
  retries: 4
  retryDelay: 500
  screenshotDirectory: 'screenshots'
`;

let customResult: Result;
let defaultResult: Result;

test.cb.before(t => {
  const bin = join(__dirname, '../index.js');
  const cwd = join(__dirname, '../../fixtures');
  const node = process.execPath;

  execFile(node, [bin, 'config.js'], {cwd}, (error, stdout, stderr) => {
    customResult = {error, stdout, stderr};

    // tslint:disable-next-line no-shadowed-variable
    execFile(node, [bin], {cwd}, (error, stdout, stderr) => {
      defaultResult = {error, stdout, stderr};

      t.end();
    });
  });
});

test('`error` should be null', t => {
  t.plan(2);

  t.is(customResult.error, null);
  t.is(defaultResult.error, null);
});

test('`stdout` should contain a test marked as TODO', t => {
  t.plan(2);

  t.regex(customResult.stdout, /ok 1 - foo # TODO/);
  t.regex(defaultResult.stdout, /ok 1 - foo # TODO/);
});

test('`stdout` should contain a test marked as SKIP', t => {
  t.plan(2);

  t.regex(customResult.stdout, /ok 2 - bar # SKIP/);
  t.regex(defaultResult.stdout, /ok 2 - bar # SKIP/);
});

test('`stderr` should contain a copy of the configuration', t => {
  t.plan(2);

  t.is(customResult.stderr.trim(), customStderr.trim());
  t.is(defaultResult.stderr.trim(), defaultStderr.trim());
});
