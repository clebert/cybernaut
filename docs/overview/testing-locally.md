# Testing locally

## Installation

```sh
npm install --save-dev cybernaut
```

*Note: If the default configuration is used, a current version of Chrome must be installed.
Cybernaut is tested with Chrome and Firefox and **provides** the latest drivers for these two.*

## Getting started

Cybernaut must be started from the command line:

```sh
$(npm bin)/cybernaut
```

Directories are recursed, with all `**/*.e2e.js` files being treated as test files.

Cybernaut produces output in TAP format, tap-mocha-reporter can be used to format it:

```sh
npm install --save-dev tap-mocha-reporter
```

```sh
$(npm bin)/cybernaut | $(npm bin)/tap-mocha-reporter spec
```

## Troubleshooting

To enable debug output, you can set the `DEBUG='cybernaut:*'` environment variable:

```sh
DEBUG='cybernaut:*' $(npm bin)/cybernaut
```

If the following error occurs:

```sh
ECONNREFUSED connect ECONNREFUSED 127.0.0.1:51983
```

then it is very likely that an outdated version of chromedriver is globally installed.
These version of chromedriver takes precedence over the version installed by Cybernaut.

On a Mac with Homebrew installed, try the following command:

```sh
brew uninstall chromedriver
```
