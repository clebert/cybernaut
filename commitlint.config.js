const {getPackages} = require('@commitlint/config-lerna-scopes').utils;

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': () => [2, 'always', [...getPackages(), 'package']]
  }
};
