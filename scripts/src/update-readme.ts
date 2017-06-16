import {readFileSync, writeFileSync} from 'fs';

const options = {encoding: 'utf8'};
const readme = readFileSync('README.md', options);

const index1 = readme.indexOf('```ts');
const index2 = readme.indexOf('```', index1 + 5);

const example = readFileSync('examples/src/readme.e2e.ts', options).trim();

const updatedReadme = `${readme.slice(
  0,
  index1 + 5
)}\n${example}\n${readme.slice(index2)}`;

writeFileSync('README.md', updatedReadme, options);
