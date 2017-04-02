#!/usr/bin/env node

/// <reference path="../typings/index.d.ts" />

import tap = require('tap');

import {sync} from 'glob';
import {Builder, WebDriver} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {Browser, Script} from './browser';
import {config} from './config';
import {Description} from './description';
import {Element} from './element';
import {PredicateBuilder} from './predicate';
import {Test} from './test';

export {
  Accessor,
  Action,
  Browser,
  Description,
  Element,
  PredicateBuilder,
  Script,
  Test
};

export type Implementation = (t: Test) => Promise<void>;

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

class TapTest extends Test {
  private readonly t: Tap.Test;

  public constructor(driver: WebDriver, t: Tap.Test) {
    super(driver, config.retries, config.retryDelay);

    this.t = t;
  }

  public fail(message: string, cause: Error): void {
    throw new Error(`${message} (cause: ${cause.message})`);
  }

  public pass(message: string): void {
    this.t.pass(message);
  }
}

const tasks: (() => void)[] = [];

export function test(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    // tslint:disable-next-line no-floating-promises
    tap.test(name, {
      diagnostic: false, timeout: 0, todo: !implementation
    }, async t => {
      if (implementation) {
        const driver = await new Builder().withCapabilities(
          config.capabilities
        ).build();

        try {
          await implementation(new TapTest(driver, t));
        } finally {
          await driver.quit();
        }
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
  for (const dependency of config.dependencies) {
    require(dependency);
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
