module.exports = function (wallaby) {
  process.env.NODE_PATH += ':' + require('path').join(wallaby.localProjectDir, 'node_modules');

  return {
    files: ['src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    env: {type: 'node', runner: 'node'},
    testFramework: 'ava'
  };
};
