#!/usr/bin/env node

/// <reference path="../types/index.d.ts" />

import createDebug = require('debug');
import tap = require('tap');

import {sync} from 'glob';
import {Key} from 'selenium-webdriver';
import {inspect} from 'util';
import {Accessor} from './accessor';
import {Action} from './action';
import {Browser, Script} from './browser';
import {Config, loadConfig, validate} from './config';
import {Element} from './element';
import {Implementation, run} from './implementation';
import {PredicateBuilder} from './predicate';
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

let config: Config = {} as any; // tslint:disable-line no-any

const configFilename = process.argv[2];

try {
  config = loadConfig(configFilename);
} catch (e) {
  console.error(`\nError: unable to load config file '${configFilename}'`);

  process.exit(1);
}

console.error('\nConfig:');

for (const key of Object.keys(config) as (keyof Config)[]) {
  // tslint:disable-next-line no-any
  const value = inspect(config[key], {breakLength: Infinity} as any);

  console.error(`  ${key}: ${value}`);
}

const configErrors = validate(config);

if (configErrors.length > 0) {
  console.error(`\nError: unable to validate config file '${configFilename}'`);

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
    return new PredicateBuilder({
      // tslint:disable no-any
      serialize(value: any): string {
        return inspect(value, {breakLength: Infinity} as any);
      }
      // tslint:enable no-any
    });
  }
}

export const it = new It();
export const browser = new Browser();

const tasks: (() => void)[] = [];

export function test(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    // tslint:disable-next-line no-floating-promises
    tap.test(
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

  console.error(`\nError: please run your tests only via ${packageName} CLI`);

  process.exit(1);
}

try {
  const {browserName} = config.capabilities;

  if (browserName === 'chrome') {
    debug('load chromedriver');

    require('chromedriver');
  } else if (browserName === 'firefox') {
    debug('load geckodriver');

    require('geckodriver');
  }

  const filenames = sync(config.include, {
    ignore: config.exclude, nodir: true, realpath: true
  });

  for (const filename of filenames) {
    debug('load test file:', filename);

    require(filename);
  }
} catch (e) {
  console.error(`\nError: ${e.message}`);

  process.exit(1);
}

tap.jobs = config.concurrency;

for (const task of tasks) {
  task();
}
