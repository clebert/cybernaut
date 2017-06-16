import {readFileSync, writeFileSync} from 'fs';
import {basename, dirname, join, relative} from 'path';

interface Options {
  readonly encoding: string;
}

function escape(pattern: string): string {
  return pattern
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

class Generator {
  private name: string;
  private options: Options;

  public constructor(filename: string) {
    if (!filename) {
      throw new Error('Please specify a file');
    }

    this.name = join(
      relative('examples/src', dirname(filename)),
      basename(filename, '.e2e.ts')
    );

    this.options = {encoding: 'utf8'};
  }

  public generateApiReference(): void {
    const template = readFileSync(
      `examples/templates/${this.name}.md`,
      this.options
    );

    const markdown = template.replace(
      '# {Placeholder}',
      [
        `# \`${this.headline}\``,
        ...this.typeDefinition,
        ...this.exampleUsage,
        ...this.exampleOutput
      ].join('\n')
    );

    const filename = `docs/api-reference/${this.name}.md`;

    console.log(filename);

    writeFileSync(filename, markdown, this.options);
  }

  private get browser(): boolean {
    return /browser\//.test(this.name);
  }

  private get element(): boolean {
    return /element\//.test(this.name);
  }

  private get it(): boolean {
    return /it\//.test(this.name);
  }

  private get utils(): boolean {
    return /utils\//.test(this.name);
  }

  private get exampleUsage(): string[] {
    return [
      '',
      '## Example usage',
      '',
      '```ts',
      readFileSync(`examples/src/${this.name}.e2e.ts`, this.options).trim(),
      '```'
    ];
  }

  private get headline(): string {
    const result = /test\('Example: (.+?)',/.exec(this.exampleUsage[4]);

    if (!result || !result[1]) {
      throw new Error('Unable to parse the headline');
    }

    return result[1];
  }

  private get elementTypeDefinition(): string[] {
    return [
      'class SeleniumElement {',
      ...readFileSync('dist/selenium/element.d.ts', this.options)
        .trim()
        .split('\n')
        .filter(line => {
          const pattern =
            ' ' + this.headline.split('.')[1].replace('()', '(?:<|\\()');

          return new RegExp(pattern).test(line);
        })
        .map(line => line.replace(/^ +/, '  '))
        .join('\n\n')
        .split('\n'),
      '}'
    ];
  }

  private get itTypeDefinition(): string[] {
    return [
      'class PredicateBuilder {',
      ...readFileSync('dist/core/predicate.d.ts', this.options)
        .trim()
        .split('\n')
        .filter(line => {
          if (/not:/.test(line)) {
            return true;
          }

          const pattern =
            ' ' + this.headline.split('.')[3].replace('()', '(?:<|\\()');

          if (new RegExp(pattern).test(line)) {
            return true;
          }

          return false;
        })
        .map(line => line.replace(/^ +/, '  '))
        .join('\n\n')
        .split('\n'),
      '}',
      '',
      'class It {',
      '  readonly should: PredicateBuilder;',
      '}',
      '',
      'const it: It;'
    ];
  }

  private moduleTypeDefinition(name: string): string[] {
    let active = false;

    return readFileSync(`dist/selenium/${name}.d.ts`, this.options)
      .trim()
      .split('\n')
      .reverse()
      .filter(line => {
        const pattern =
          ' ' + this.headline.split('.')[1].replace('()', '(?:<|\\()');

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
      .join('\n\n')
      .split('\n');
  }

  private get typeDefinition(): string[] {
    let typeDefinition: string[] = [];

    if (this.browser) {
      typeDefinition = this.moduleTypeDefinition('browser');
    } else if (this.element) {
      typeDefinition = this.elementTypeDefinition;
    } else if (this.it) {
      typeDefinition = this.itTypeDefinition;
    } else if (this.utils) {
      typeDefinition = this.moduleTypeDefinition('utils');
    } else {
      throw new Error('Unable to parse the type definition');
    }

    return ['', '## Type definition', '', '```ts', ...typeDefinition, '```'];
  }

  private get exampleOutput(): string[] {
    let active = false;

    if (this.utils) {
      return [];
    }

    return [
      '',
      '## Example output',
      '',
      '```fundamental',
      ...readFileSync('examples/dist/chrome.log', this.options)
        .trim()
        .split('\n')
        .map(line => line.replace(/\u001b\[.+?m/g, '').trim())
        .filter(line => {
          if (/^cybernaut:/.test(line)) {
            return false;
          }

          if (new RegExp('Example: ' + escape(this.headline)).test(line)) {
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
    ];
  }
}

const generator = new Generator(process.argv[2]);

generator.generateApiReference();
