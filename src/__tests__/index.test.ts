import test from 'ava';
import {execFile} from 'child_process';
import {join} from 'path';

interface Result {
  readonly error: Error | null;
  readonly stdout: string;
  readonly stderr: string;
}

let result: Result;

test.cb.before(t => {
  execFile(process.execPath, [
    join(__dirname, '../index.js'), 'test-config.js'
  ], {cwd: join(__dirname, '../../fixtures')}, (error, stdout, stderr) => {
    result = {error, stdout, stderr};

    t.end();
  });
});

test('`error` should be null', t => {
  t.plan(1);

  t.is(result.error, null);
});

test('`stdout` should contain a test marked as TODO', t => {
  t.plan(1);

  t.regex(result.stdout, /ok 1 - foo # TODO/);
});

test('`stdout` should contain a test marked as SKIP', t => {
  t.plan(1);

  t.regex(result.stdout, /ok 2 - bar # SKIP/);
});

test('`stderr` should contain a copy of the configuration', t => {
  t.plan(7);

  t.regex(result.stderr, /capabilities: \{ browserName: 'chrome' \}/);
  t.regex(result.stderr, /concurrency: 1/);
  t.regex(result.stderr, /dependencies: \[\]/);
  t.regex(result.stderr, /exclude: \[ '\*\*\/node_modules\/\*\*\/\*' \]/);
  t.regex(result.stderr, /include: '\*\*\/\*\.e2e\.js'/);
  t.regex(result.stderr, /retries: 4/);
  t.regex(result.stderr, /retryDelay: 500/);
});
