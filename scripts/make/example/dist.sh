#!/bin/sh

set -e -x

rm -rf example/dist

"$(npm bin)"/tsc --project example

"$(npm bin)"/tslint \
  --config tslint.json \
  --project example/tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  'example/tests/**/*.ts'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  'example/tests/**/*.ts'
