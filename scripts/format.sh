#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck:
# http://www.shellcheck.net/

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  "$@" \
  '**/*.{js,json,jsx}'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  "$@" \
  '**/*.{ts,tsx}'
