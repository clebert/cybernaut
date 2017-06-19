import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {join} from 'path';

const options = {encoding: 'utf8'};

function generateInterfacesSummary(): string {
  const dirname = 'docs/api-reference/interfaces';

  return readdirSync(dirname)
    .map(filename => {
      const lines = readFileSync(join(dirname, filename), options).split('\n');
      const subPoint = lines[0].slice(2).replace(/`/g, '');

      return `  * [${subPoint}](${join(dirname, filename)})`;
    })
    .join('\n');
}

function generateSummary(): void {
  const summary = [
    '# Summary',
    '',
    '## Overview',
    '',
    '* [Testing with Docker](docs/overview/testing-with-docker.md)',
    '* [Testing locally](docs/overview/testing-locally.md)',
    '* [Configuring Cybernaut](docs/overview/configuring-cybernaut.md)',
    '* [Related links](docs/overview/related-links.md)',
    '* [Changelog]' +
      '(https://github.com/clebert/cybernaut/blob/master/CHANGELOG.md)',
    '',
    '## Recipes',
    '',
    '* [Writing tests](docs/recipes/writing-tests.md)',
    '* [Emulating mobile devices in Chrome]' +
      '(docs/recipes/emulating-mobile-devices-in-chrome.md)',
    '',
    '## API Reference',
    '',
    '* Exports',
    '  * [test()](docs/api-reference/exports/test.md)',
    '  * [browser](docs/api-reference/exports/browser.md)',
    '  * [element](docs/api-reference/exports/element.md)',
    '  * [it](docs/api-reference/exports/it.md)',
    '  * [utils](docs/api-reference/exports/utils.md)',
    '',
    '* Interfaces',
    generateInterfacesSummary(),
    '',
    '## Contributing',
    '',
    '* [GitHub Repository](https://github.com/clebert/cybernaut)',
    '* [Development](docs/contributing/development.md)',
    ''
  ].join('\n');

  const filename = 'SUMMARY.md';

  console.log(filename);

  writeFileSync(filename, summary, options);
}

generateSummary();
