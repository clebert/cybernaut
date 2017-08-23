#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

npm run format:check
npm run lint
npm test
