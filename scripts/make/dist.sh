#!/bin/sh

set -e -x

rm -rf dist

"$(npm bin)"/tsc --project .

chmod +x dist/index.js

"$(npm bin)"/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  '{src,types}/**/*.ts'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  '{src,types}/**/*.ts'

DEBUG='cybernaut:*' "$(npm bin)"/jest --coverage --no-cache --verbose
