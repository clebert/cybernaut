#!/usr/bin/env node

/// <reference path="../types/index.d.ts" />

import tap = require('tap');

import {sync} from 'glob';
import {Key} from 'selenium-webdriver';
import {inspect} from 'util';
import {Accessor} from './accessor';
import {Action} from './action';
import {Browser, Script} from './browser';
import {Config, loadConfig, validate} from './config';
import {Description} from './description';
import {Element} from './element';
import {Implementation, execute} from './implementation';
import {PredicateBuilder} from './predicate';
import {Test} from './test';

export {
  Accessor,
  Action,
  Browser,
  Description,
  Element,
  Implementation,
  Key,
  PredicateBuilder,
  Script,
  Test
};

let config: Config = {} as any; // tslint:disable-line no-any

const configFilename = process.argv[2];

try {
  config = loadConfig(configFilename);
} catch (e) {
  console.error(`\nError: Unable to load config file '${configFilename}'`);

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
  console.error(`\nError: Unable to validate config file '${configFilename}'`);

  for (const configError of configErrors) {
    console.error('  ' + configError);
  }

  process.exit(1);
}

export function defineElement(selector: string): Element {
  return new Element(selector);
}

export class It {
  public get should(): PredicateBuilder {
    return new PredicateBuilder();
  }
}

export const it = new It();
export const browser = new Browser(config.screenshotDirectory);

const tasks: (() => void)[] = [];

export function test(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    // tslint:disable-next-line no-floating-promises
    tap.test(name, {
      diagnostic: false, timeout: 0, todo: !implementation
    }, async t => {
      if (implementation) {
        await execute(implementation, t, config);
      }
    }).catch((error: Error) => {
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
    require('chromedriver');
  } else if (browserName === 'firefox') {
    require('geckodriver');
  }

  const filenames = sync(config.include, {
    ignore: config.exclude, nodir: true, realpath: true
  });

  for (const filename of filenames) {
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
