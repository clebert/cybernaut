import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {basename, join} from 'path';

type Name = 'browser' | 'element' | 'it' | 'utils';

interface Example {
  readonly code: string;
  readonly name: string;
  readonly template: string;
}

const options = {encoding: 'utf8'};

function readExamples(name: Name): Example[] {
  const srcDirname = join('examples/src/', name);
  const templatesDirname = join('examples/templates/', name);

  return readdirSync(srcDirname).map(filename => ({
    code: readFileSync(join(srcDirname, filename), options).trim(),
    name,
    template: readFileSync(
      join(templatesDirname, basename(filename, '.e2e.ts')) + '.md',
      options
    ).replace(/# /g, '## ')
  }));
}

function parseHeadline(example: Example): string {
  const result = /test\('Example: (.+?)',/.exec(example.code);

  if (!result || !result[1]) {
    throw new Error('Unable to parse the headline');
  }

  return result[1];
}

function generateSummary(name: Name): string {
  return [
    `# \`${name}\``,
    '',
    ...readExamples(name).map(example => {
      const headline = parseHeadline(example);
      const fragment = headline.toLowerCase().replace(/[^a-z]/g, '');

      return `* [\`${headline}\`](#${fragment})`;
    }),
    ''
  ].join('\n');
}

function generateModuleTypeDefinition(name: string, example: Example): string {
  let active = false;

  return readFileSync(`dist/selenium/${name}.d.ts`, options)
    .trim()
    .split('\n')
    .reverse()
    .filter(line => {
      const headline = parseHeadline(example);
      const pattern = ' ' + headline.split('.')[1].replace('()', '(?:<|\\()');

      if (new RegExp(pattern).test(line)) {
        active = true;

        return true;
      }

      if (active) {
        if (/^export declare type/.test(line)) {
          return true;
        }

        active = false;
      }

      return false;
    })
    .map(line => line.replace('export declare ', ''))
    .reverse()
    .join('\n\n');
}

function generateElementTypeDefinition(example: Example): string {
  const body = readFileSync('dist/selenium/element.d.ts', options)
    .trim()
    .split('\n')
    .filter(line => {
      const headline = parseHeadline(example);
      const pattern = ' ' + headline.split('.')[1].replace('()', '(?:<|\\()');

      return new RegExp(pattern).test(line);
    })
    .map(line => line.replace(/^ +/, '  '))
    .join('\n\n');

  return ['class SeleniumElement {', body, '}'].join('\n');
}

function generateItTypeDefinition(example: Example): string {
  const body = readFileSync('dist/core/predicate.d.ts', options)
    .trim()
    .split('\n')
    .filter(line => {
      if (/not:/.test(line)) {
        return true;
      }

      const headline = parseHeadline(example);
      const pattern = ' ' + headline.split('.')[3].replace('()', '(?:<|\\()');

      if (new RegExp(pattern).test(line)) {
        return true;
      }

      return false;
    })
    .map(line => line.replace(/^ +/, '  '))
    .join('\n\n');

  return [
    'class PredicateBuilder {',
    body,
    '}',
    '',
    'class It {',
    '  readonly should: PredicateBuilder;',
    '}',
    '',
    'const it: It;'
  ].join('\n');
}

function generateTypeDefinition(name: Name, example: Example): string {
  let code: string;

  switch (name) {
    case 'browser':
      code = generateModuleTypeDefinition(name, example);
      break;
    case 'element':
      code = generateElementTypeDefinition(example);
      break;
    case 'it':
      code = generateItTypeDefinition(example);
      break;
    case 'utils':
      code = generateModuleTypeDefinition(name, example);
      break;
    default:
      throw new Error('Unable to generate the type definition');
  }

  return ['', '### Type definition', '', '```ts', code, '```'].join('\n');
}

function generateExampleUsage(example: Example): string {
  return ['', '### Example usage', '', '```ts', example.code, '```'].join('\n');
}

function escape(pattern: string): string {
  return pattern
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function generateExampleOutput(example: Example): string {
  let active = false;

  const chromeLog = readFileSync('examples/dist/chrome.log', options).trim();
  const headline = parseHeadline(example);

  return [
    '',
    '### Example output',
    '',
    '```fundamental',
    ...chromeLog
      .split('\n')
      .map(line => line.replace(/\u001b\[.+?m/g, '').trim())
      .filter(line => {
        if (/^cybernaut:/.test(line)) {
          return false;
        }

        if (new RegExp('Example: ' + escape(headline)).test(line)) {
          active = true;

          return true;
        }

        if (active) {
          if (/✓/.test(line)) {
            return true;
          }

          active = false;
        }

        return false;
      })
      .map(line => (/✓/.test(line) ? '  ' + line : line)),
    '```'
  ].join('\n');
}

function generateBody(name: Name): string {
  return readExamples(name)
    .map(example =>
      example.template.replace(
        '## {Placeholder}',
        [
          `## \`${parseHeadline(example)}\``,
          generateTypeDefinition(name, example),
          generateExampleUsage(example),
          generateExampleOutput(example)
        ].join('\n')
      )
    )
    .join('\n');
}

function generateApiReference(name: Name): void {
  const data = `${generateSummary(name)}\n${generateBody(name)}`;
  const filename = `docs/api-reference/exports/${name}.md`;

  console.log(filename);

  writeFileSync(filename, data, options);
}

generateApiReference('browser');
generateApiReference('element');
generateApiReference('it');
generateApiReference('utils');
