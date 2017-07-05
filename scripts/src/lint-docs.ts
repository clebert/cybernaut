import markdownlint = require('markdownlint');

import {sync} from 'globby';

const options = {
  config: require('../../.markdownlint.json'),
  files: sync(['**/*.md', '!**/_book/**/*', '!**/node_modules/**/*'], {
    nodir: true,
    realpath: true
  })
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
