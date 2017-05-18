'use strict';

function setup(wallaby) {
  const jestConfig = require('./package.json').jest;

  // https://github.com/wallabyjs/public/issues/1152#issuecomment-300151646
  delete jestConfig.transform;

  wallaby.testFramework.configure(jestConfig);
}

module.exports = function () {
  return {
    debug: true,
    env: {type: 'node', runner: 'node'},
    files: ['src/**/*.ts', '!src/**/*.test.ts'],
    setup,
    testFramework: 'jest',
    tests: ['src/**/*.test.ts']
  };
};
