import Ajv = require('ajv');
import createDebug = require('debug');

import {resolve} from 'path';
import {SeleniumConfig} from './selenium/config';

export interface Config extends SeleniumConfig {
  readonly concurrency: number;
  readonly files: string[];
}

const debug = createDebug('cybernaut:config');

const defaultConfig: Config = {
  capabilities: {browserName: 'chrome'},
  concurrency: 1,
  files: ['**/*.e2e.js', '!**/node_modules/**/*'],
  retries: 4,
  retryDelay: 1000,
  timeouts: {element: 0, page: 30000, script: 30000}
};

export function loadConfig(filename?: string): Config {
  filename = filename ? resolve(filename) : '';

  if (filename) {
    debug('Load the custom config file:', filename);
  } else {
    debug('Load the default config');
  }

  const customConfig = filename ? require(filename) : {};

  return Object.freeze({...defaultConfig, ...customConfig});
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
