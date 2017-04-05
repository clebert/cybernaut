import Ajv = require('ajv');

import {resolve} from 'path';
import {inspect} from 'util';

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

const configFilename = process.argv[2];

let customConfig: Partial<Config> | undefined;

try {
  customConfig = configFilename ? require(resolve(configFilename)) : {};
} catch (e) {
  console.error(`\nError: Unable to load config file '${configFilename}'`);

  process.exit(1);
}

export const config = {...defaultConfig, ...customConfig};

console.error('\nConfig:');

for (const key of Object.keys(config)) {
  // tslint:disable-next-line no-any
  const value = inspect((config as any)[key], {breakLength: Infinity} as any);

  console.error(`  ${key}: ${value}`);
}

const schema = require('../config-schema.json');

schema.required = Object.keys(defaultConfig);

const ajv = new Ajv({allErrors: true});

if (!ajv.validate(schema, config) && ajv.errors) {
  const separator = '|';

  const errorsText = ajv.errorsText(ajv.errors, {
    dataVar: '  config', separator
  });

  console.error(`\nError: Unable to validate config file '${configFilename}'`);

  for (const errorText of errorsText.split(separator)) {
    console.error(errorText);
  }

  process.exit(1);
}
