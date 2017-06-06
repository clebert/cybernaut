#!/bin/sh

set -e

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --write \
  '{example/tests,src,types}/**/*.ts'
