import Ajv = require('ajv');
import createDebug = require('debug');

import {resolve} from 'path';

export interface Capabilities {
  readonly browserName: string;
}

export interface Timeouts {
  readonly element: number;
  readonly page: number;
  readonly script: number;
}

export interface Config {
  readonly capabilities: Capabilities;
  readonly concurrency: number;
  readonly exclude: string[];
  readonly include: string;
  readonly retries: number;
  readonly retryDelay: number;
  readonly timeouts: Timeouts;
}

const debug = createDebug('cybernaut:config');

const defaultConfig: Config = {
  capabilities: {browserName: 'chrome'},
  concurrency: 1,
  exclude: ['**/node_modules/**/*'],
  include: '**/*.e2e.js',
  retries: 9,
  retryDelay: 1000,
  timeouts: {element: 0, page: 30000, script: 30000}
};

export function loadConfig(
  filename?: string,
  /* istanbul ignore next */
  _require: typeof require = require
): Config {
  filename = filename ? resolve(filename) : '';

  if (filename) {
    debug('load custom config:', filename);
  } else {
    debug('load default config');
  }

  const customConfig = filename ? _require(filename) : {};

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
