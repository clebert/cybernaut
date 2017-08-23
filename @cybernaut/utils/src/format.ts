import stringifyObject = require('stringify-object');

/* tslint:disable-next-line no-any */
export function format(value: any): string {
  return stringifyObject(value, {
    indent: '  ',
    inlineCharacterLimit: Infinity,
    singleQuotes: true
  });
}
