#!/bin/sh

set -e

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --write \
  '{src,types}/**/*.ts' \
  'scripts/example/tests/**/*.ts'
