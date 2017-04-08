const {join} = require('path');

module.exports = function (wallaby) {
  process.env.NODE_PATH += ':' + join(wallaby.localProjectDir, 'node_modules');

  return {
    files: [
      'config-schema.json', 'src/**/*.ts', '!src/**/*.test.ts', '!src/index.ts'
    ],
    tests: ['src/**/*.test.ts'],
    env: {type: 'node', runner: 'node'},
    testFramework: 'ava'
  };
};
