#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck:
# http://www.shellcheck.net/

rm -rf lib/

../../node_modules/.bin/tsc --project . "$@"

rm -rf lib/tests/
