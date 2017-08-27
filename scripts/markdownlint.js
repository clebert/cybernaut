const {sync} = require('globby');
const markdownlint = require('markdownlint');

const options = {
  config: require(__dirname + '/../.markdownlint.json'),
  files: sync(['**/*.md', '!**/node_modules/**/*'], {
    nodir: true,
    realpath: true
  })
};

console.log(options.files.join('\n'));

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
