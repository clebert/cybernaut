import Ajv = require('ajv');

import {resolve} from 'path';

export interface Timeouts {
  readonly element: number;
  readonly page: number;
  readonly script: number;
}

export interface Config {
  readonly capabilities: object;
  readonly concurrency: number;
  readonly dependencies: string[];
  readonly exclude: string[];
  readonly include: string;
  readonly retries: number;
  readonly retryDelay: number;
  readonly screenshotDirectory: string;
  readonly timeouts: Timeouts;
}

const defaultConfig: Config = {
  capabilities: {browserName: 'chrome'},
  concurrency: 1,
  dependencies: ['chromedriver'],
  exclude: ['**/node_modules/**/*'],
  include: '**/*.e2e.js',
  retries: 4,
  retryDelay: 500,
  screenshotDirectory: 'screenshots',
  timeouts: {element: 0, page: 30000, script: 30000}
};

export function loadConfig(
  filename?: string,
  /* istanbul ignore next */
  _require: typeof require = require
): Config {
  const customConfig = filename ? _require(resolve(filename)) : {};

  return {...defaultConfig, ...customConfig};
}

const schema = require('../config-schema.json');

schema.required = Object.keys(defaultConfig);

export function validate(config: Config): string[] {
  const ajv = new Ajv({allErrors: true});

  if (!ajv.validate(schema, config) && ajv.errors) {
    const separator = '///';

    return ajv.errorsText(ajv.errors, {
      dataVar: 'config', separator
    }).split(separator);
  }

  return [];
}
