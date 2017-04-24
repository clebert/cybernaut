#!/usr/bin/env sh

set -e

echo 'Running conventional-changelog-lint ...'

"$(npm bin)"/conventional-changelog-lint --from=HEAD~1

echo 'Running shellcheck ...'

./scripts/docker/run-shellcheck.sh

echo 'Running markdownlint ...'

./scripts/lib/markdownlint.js

echo 'Running tsfmt ...'

"$(npm bin)"/tsfmt --verify

echo 'Running tslint ...'

"$(npm bin)"/tslint \
  --config tslint.json \
  --project tsconfig.json \
  --type-check \
  --formatters-dir node_modules/custom-tslint-formatters/formatters \
  --format grouped \
  '{src,types}/**/*.ts'
