#!/bin/sh

set -e

echo 'Running conventional-changelog-lint ...'

"$(npm bin)"/conventional-changelog-lint --from=HEAD~1

echo 'Running shellcheck ...'

docker run -it --rm \
  -v "$(pwd)"/scripts:/scripts \
  --entrypoint /bin/sh \
  koalaman/shellcheck \
  /scripts/shellcheck.sh

echo 'Running markdownlint ...'

./scripts/markdownlint.js

echo 'Running prettier ...'

"$(npm bin)"/prettier \
  --single-quote \
  --no-bracket-spacing \
  --parser typescript \
  --list-different \
  '{src,types}/**/*.ts' \
  'scripts/example/tests/**/*.ts'

echo 'Running tslint ...'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  '{src,types}/**/*.ts'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project scripts/example/tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  'scripts/example/tests/**/*.ts'
