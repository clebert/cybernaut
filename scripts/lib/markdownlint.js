#!/usr/bin/env node

'use strict';

const markdownlint = require('markdownlint');

const options = {
  files: ['README.md', 'example/README.md'],
  config: require('../../.markdownlint.json')
};

markdownlint(options, (error, result) => {
  if (error) {
    console.error(error.message);

    process.exit(1);
  } else {
    const errorsText = result.toString().trim();

    if (errorsText) {
      console.error(errorsText);

      process.exit(1);
    }
  }
});
