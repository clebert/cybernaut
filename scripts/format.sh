#!/bin/sh

set -e

# IMPORTANT: If you edit this file, please validate it using ShellCheck.
# http://www.shellcheck.net/

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  "$@" \
  '{@cybernaut/*,scripts/**,.}/*.{js,json}'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  "$@" \
  '@cybernaut/*/{src,types}/**/*.{ts,tsx}'
