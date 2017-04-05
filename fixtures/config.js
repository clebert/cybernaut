module.exports = {
  capabilities: {browserName: 'phantomjs'},
  concurrency: 2,
  dependencies: [],
  exclude: ['custom-config.js'],
  include: '*.js',
  retries: 3,
  retryDelay: 1000,
  screenshotDirectory: '/dev/null',
  timeouts: {element: 123, page: 456, script: 789}
};
