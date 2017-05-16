#!/usr/bin/env node

/// <reference path="../types/index.d.ts" />

import createDebug = require('debug');
import tap = require('tap');

import {sync} from 'globby';
import {Key} from 'selenium-webdriver';
import {Config, loadConfig, validate} from './config';
import {Accessor} from './core/accessor';
import {Action} from './core/action';
import {Browser, Script} from './core/browser';
import {Element} from './core/element';
import {PredicateBuilder} from './core/predicate';
import {format} from './core/utils';
import {Implementation, run} from './implementation';
import {Test} from './test';

export {
  Accessor,
  Action,
  Browser,
  Element,
  Implementation,
  Key,
  PredicateBuilder,
  Script,
  Test
};

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

export function defineElement(name: string, selector: string): Element {
  return new Element(name, selector);
}

export class It {
  public get should(): PredicateBuilder {
    return new PredicateBuilder();
  }
}

export const it = new It();
export const browser = new Browser();

const tasks: (() => void)[] = [];

export function test(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    tap.test( // tslint:disable-line no-floating-promises
      name,
      {diagnostic: false, timeout: 0, todo: !implementation},
      async logger => {
        if (implementation) {
          await run(implementation, logger, config);
        }
      }
    ).catch((error: Error) => {
      tap.fail(error.message);
    });
  });
}

export function skip(name: string, implementation: Implementation): void {
  tasks.push(() => {
    tap.test(name, {skip: true}); // tslint:disable-line no-floating-promises
  });
}

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

for (const task of tasks) {
  task();
}
