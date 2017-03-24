#!/usr/bin/env node

/// <reference path="../@types/selenium-webdriver.d.ts" />

import tap = require('tap');

import {sync} from 'glob';
import {Builder, WebDriver} from 'selenium-webdriver';
import {Browser} from './browser';
import {config} from './config';
import {Element} from './element';
import {PredicateBuilder} from './predicate';
import {Test} from './test';

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

export const browser = new Browser();

class TapTest extends Test {
  private readonly t: Tap.Test;

  public constructor(driver: WebDriver, stepTimeout: number, t: Tap.Test) {
    super(driver, stepTimeout);

    this.t = t;
  }

  public fail(message: string, cause: Error): void {
    throw new Error(`${message} (Cause: ${cause.message})`);
  }

  public pass(message: string): void {
    this.t.pass(message);
  }
}

const tasks: (() => void)[] = [];

export function test(
  name: string,
  implementation: Implementation,
  stepTimeout: number = config.stepTimeout
): void {
  tasks.push(() => {
    // tslint:disable-next-line no-floating-promises
    tap.test(name, {timeout: 0, diagnostic: false}, async t => {
      const driver = await new Builder().withCapabilities(
        config.capabilities
      ).build();

      try {
        await implementation(new TapTest(driver, stepTimeout, t));
      } finally {
        await driver.quit();
      }
    }).catch((error: Error) => {
      tap.fail(error.message);
    });
  });
}

export function skip(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    tap.test(name, {skip: true}); // tslint:disable-line no-floating-promises
  });
}

export function todo(name: string, implementation?: Implementation): void {
  tasks.push(() => {
    tap.test(name, {todo: true}); // tslint:disable-line no-floating-promises
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
