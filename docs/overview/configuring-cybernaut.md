# Configuring Cybernaut

The following configuration is active by default:

```json
{
  "capabilities": {"browserName": "chrome"},
  "concurrency": 1,
  "files": ["**/*.e2e.js", "!**/node_modules/**/*"],
  "retries": 4,
  "retryDelay": 1000,
  "timeouts": {"element": 0, "page": 30000, "script": 30000}
}
```

Configuration options:

* `capabilities`: Specifies the desired [WebDriver capabilities][selenium-desired-capabilities].
* `capabilities.browserName`: Specifies the browser to use. For example: `"chrome"` or `"firefox"`
* `concurrency`: Specifies the maximum number of end-to-end tests running at the same time.
* `files`: Specifies the [glob patterns][globby], for which matching files will be added to the set of test files.
* `retries`: Specifies the maximum number of retries of failed test steps.
* `retryDelay`: Specifies the time, in milliseconds, to wait between retries of failed test steps.
* `timeouts.element`: Specifies the maximum time, in milliseconds, to wait when searching for an element, that is not immediately present, before returning an error.
* `timeouts.page`: Specifies the maximum time, in milliseconds, to wait for a page load to complete before returning an error.
* `timeouts.script`: Specifies the maximum time, in milliseconds, for an asynchronous script to finish execution before returning an error.

A separate configuration can be specified as a command line argument:

```sh
$(npm bin)/cybernaut config.json
```

Such a configuration can be validated with [this JSON schema][config-schema] and written as a

JSON file:

```json
{
  "capabilities": {"browserName": "firefox"}
}
```

or JavaScript module:

```js
module.exports = {
  capabilities: {browserName: 'firefox'}
};
```

[config-schema]: https://github.com/clebert/cybernaut/blob/master/config-schema.json
[globby]: https://github.com/sindresorhus/globby
[selenium-desired-capabilities]: https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
