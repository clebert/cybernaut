#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck.
# http://www.shellcheck.net/

../../node_modules/.bin/jest --no-cache

node chrome/vanilla.js
