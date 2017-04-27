# Writing end-to-end tests

It is recommended to write your end-to-end tests using [`async`][mdn-async] functions, which are natively supported by Node.js as of version 7. Alternatively, the test files must be compiled using TypeScript or Babel.

If you write your end-to-end tests with TypeScript, it is recommended to enable the [`no-floating-promises`][tslint-rule-no-floating-promises] TSLint rule. This can prevent the [`await`][mdn-await] operators from being forgotten.

[mdn-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[mdn-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[tslint-rule-no-floating-promises]: https://palantir.github.io/tslint/rules/no-floating-promises/
