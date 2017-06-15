#!/usr/bin/env node

import createDebug = require('debug');
import tap = require('tap');

import {sync} from 'globby';
import {Config, loadConfig, validate} from './config';
import {PredicateBuilder} from './core/predicate';
import {format} from './core/utils';
import {SeleniumTest, run} from './selenium/test';

export * from './selenium';

const debug = createDebug('cybernaut:index');

// tslint:disable-next-line no-object-literal-type-assertion
let config: Config = {} as Config;

const configFilename = process.argv[2];

try {
  config = loadConfig(configFilename);
} catch (e) {
  console.error(`\nError: Unable to load the config file: '${configFilename}'`);

  process.exit(1);
}

console.error('\nConfig:');

for (const key of Object.keys(config) as (keyof Config)[]) {
  console.error(`  ${key}: ${format(config[key])}`);
}

const configErrors = validate(config);

if (configErrors.length > 0) {
  console.error(
    `\nError: Unable to validate the config file: '${configFilename}'`
  );

  for (const configError of configErrors) {
    console.error('  ' + configError);
  }

  process.exit(1);
}

export class It {
  public get should(): PredicateBuilder {
    return new PredicateBuilder();
  }
}

export const it = new It();

type Task = () => void;

let onlyTask: Task | undefined;

const tasks: Task[] = [];

function createTask(name: string, implementation: SeleniumTest): Task {
  return () => {
    tap
      .test(name, {diagnostic: false, timeout: 0}, async logger => {
        if (implementation) {
          await run(implementation, logger, config);
        }
      })
      .catch((error: Error) => {
        tap.fail(error.message);
      });
  };
}

export interface TestFunction {
  (name: string, implementation: SeleniumTest): void;

  only(name: string, implementation: SeleniumTest): void;
  skip(name: string, implementation: SeleniumTest): void;
  todo(name: string): void;
}

export const test: TestFunction = ((
  name: string,
  implementation: SeleniumTest
) => {
  tasks.push(createTask(name, implementation));
}) as any; // tslint:disable-line no-any

test.only = (name: string, implementation: SeleniumTest) => {
  onlyTask = createTask(name, implementation);
};

test.skip = (name: string, implementation: SeleniumTest) => {
  tasks.push(() => {
    tap.test(name, {skip: true}).catch((error: Error) => {
      tap.fail(error.message);
    });
  });
};

test.todo = (name: string) => {
  tasks.push(() => {
    tap.test(name, {todo: true}).catch((error: Error) => {
      tap.fail(error.message);
    });
  });
};

if (require.main !== module) {
  const packageName = require('../package.json').name;

  console.error(`\nError: Please run your tests only via ${packageName} CLI`);

  process.exit(1);
}

try {
  const {browserName} = config.capabilities;

  if (browserName === 'chrome') {
    debug('Load the chromedriver');

    require('chromedriver');
  } else if (browserName === 'firefox') {
    debug('Load the geckodriver');

    require('geckodriver');
  }

  for (const file of sync(config.files, {nodir: true, realpath: true})) {
    debug('Load the test file:', file);

    require(file);
  }
} catch (e) {
  console.error(`\nError: ${e.message}`);

  process.exit(1);
}

tap.jobs = config.concurrency;

if (onlyTask) {
  debug('Run only one test');

  onlyTask();
} else {
  for (const task of tasks) {
    task();
  }
}
