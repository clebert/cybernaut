#!/bin/sh

set -e

# IMPORTANT: If you change the script, please check it with ShellCheck.
# http://www.shellcheck.net/

rm -rf lib/

../../node_modules/.bin/tsc --project . "$@"

rm -rf lib/tests/
