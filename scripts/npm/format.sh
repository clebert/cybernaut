#!/bin/sh

set -e

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --write \
  '{e2e-tests/src,examples/src,scripts/src,src,types}/**/*.ts'
