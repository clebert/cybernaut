import {readFileSync, writeFileSync} from 'fs';

const filename = process.argv[2];

if (!filename) {
  throw new Error('Please specify a log file');
}

function normalize(line: string): string {
  return line.replace(/\u001b\[.+?m/g, '').trim();
}

const options = {encoding: 'utf8'};

const log = readFileSync(filename, options);

const lines = log
  .split('\r\n')
  .map(normalize)
  .filter(line => line && !/^cybernaut:/.test(line))
  .slice(9, -1);

const data = JSON.stringify(lines, null, 2) + '\n';

writeFileSync(filename + '.json', data, options);
