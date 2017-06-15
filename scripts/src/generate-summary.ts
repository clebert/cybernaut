import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {join} from 'path';

const options = {encoding: 'utf8'};

const summary: string[] = [
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
  '* Interfaces'
];

const interfacesDirname = 'docs/api-reference/interfaces';

for (const filename of readdirSync(interfacesDirname)) {
  const lines = readFileSync(join(interfacesDirname, filename), options).split(
    '\n'
  );

  const subPoint = lines[0].slice(2).replace(/`/g, '');

  summary.push(`  * [${subPoint}](${join(interfacesDirname, filename)})`);
}

summary.push('');
summary.push('* [test()](docs/api-reference/test.md)');
summary.push('');

function summarizeApiReference(name: string): void {
  summary.push('* ' + name);

  const dirname = 'docs/api-reference/' + name;

  for (const filename of readdirSync(dirname)) {
    const lines = readFileSync(join(dirname, filename), options).split('\n');

    const subPoint = lines[0]
      .slice(2)
      .replace(/`/g, '')
      .replace(name + '.', '.');

    summary.push(`  * [${subPoint}](${join(dirname, filename)})`);
  }

  summary.push('');
}

summarizeApiReference('browser');
summarizeApiReference('element');
summarizeApiReference('it');
summarizeApiReference('utils');

summary.push('## Contributing');
summary.push('');
summary.push('* [GitHub Repository](https://github.com/clebert/cybernaut)');
summary.push('* [Development](docs/contributing/development.md)');
summary.push('');

writeFileSync('SUMMARY.md', summary.join('\n'), options);
